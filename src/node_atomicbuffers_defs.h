#ifndef NODE_ATOMICBUFFERS_DEFS_
#define NODE_ATOMICBUFFERS_DEFS_

/* Include atomic ops for specific compilers and architectures */
#if defined(_MSC_VER)
#include "node_atomicbuffers_win.h"
#elif defined(__powerpc__) || defined(__ppc__) || defined(__PPC__) || \
      defined(__powerpc64__) || defined(__ppc64__) || defined(__PPC64__)
#include "node_atomicbuffers_ppc.h"
#elif defined(__aarch64__)
#include "node_atomicbuffers_arm64.h"
#elif defined(__i386) || defined(_M_IX86) || \
      defined(__x86_64__) || defined(_M_X64)
#include "node_atomicbuffers_x86_32_64.h"
#elif (__GNUC__ > 4) || (__GNUC__ == 4 && __GNUC_MINOR__ >= 1)
#include "node_atomicbuffers_gnuc_generic.h"
#else
#error "No supported memory barrier options for this build"
#endif


#define NODE_ATOMICBUFFERS_LOAD_VALUE(var, exp)                                                \
  do {                                                                        \
    node_atomicbuffers__read_barrier();                                                      \
    (var) = (exp);                                                            \
  } while (0)


#define NODE_ATOMICBUFFERS_STORE_VALUE(queue, ptr)                                             \
  do {                                                                        \
    (queue) = (ptr);                                                          \
    node_atomicbuffers__write_barrier();                                                     \
  } while (0)


#endif  /* NODE_ATOMICBUFFERS_DEFS_ */
