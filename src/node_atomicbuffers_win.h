#ifndef NODE_ATOMICBUFFERS_WIN_
#define NODE_ATOMICBUFFERS_WIN_

#include <windows.h>

/* Visual Studio 2012 and above */
#if (_MSC_VER >= 1700)
#include <atomic>

static _node_atomicbuffers_inline void node_atomicbuffers__read_barrier(void) {
  std::atomic_thread_fence(std::memory_order_acquire);
}

static _node_atomicbuffers_inline void node_atomicbuffers__write_barrier(void) {
  std::atomic_thread_fence(std::memory_order_release);
}

/* Visual Studio 2008 and above */
#elif (_MSC_VER >= 1500)
#include <intrin.h>

static _node_atomicbuffers_inline void node_atomicbuffers__read_barrier(void) {
  _ReadBarrier();
}

static _node_atomicbuffers_inline void node_atomicbuffers__write_barrier(void) {
  _WriteBarrier();
}

/* Seriously? */
#else
#error "No supported memory barrier options for this build"
#endif

#endif  /* NODE_ATOMICBUFFERS_WIN_ */
