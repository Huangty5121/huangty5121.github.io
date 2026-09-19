"""Quiet, localhost-only demo server; no request logging to a detached PTY."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


if __name__ == '__main__':
    root = Path(__file__).resolve().parent / 'dist'
    handler = partial(PreviewHandler, directory=str(root))
    ThreadingHTTPServer(('127.0.0.1', 8772), handler).serve_forever()
