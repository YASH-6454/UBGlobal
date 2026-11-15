"""Tiny in-memory rate limiter (per process). Good enough for a single Render instance."""
import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request

_hits: dict[str, deque] = defaultdict(deque)


def client_ip(request: Request) -> str:
    # Render / Vercel sit behind a proxy; first X-Forwarded-For entry is the real client.
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_rate_limit(key: str, max_hits: int, window_seconds: int) -> None:
    """Raise 429 if `key` has made more than `max_hits` calls in the last `window_seconds`."""
    now = time.monotonic()
    q = _hits[key]
    while q and now - q[0] > window_seconds:
        q.popleft()
    if len(q) >= max_hits:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    q.append(now)
