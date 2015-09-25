#ifndef NODE_ATOMICBUFFERS_ARM64_
#define NODE_ATOMICBUFFERS_ARM64_

#if defined(__GNUC__)

static _node_atomicbuffers_inline void node_atomicbuffers__read_barrier(void) {
  __asm__ __volatile__ ("dmb ishld":::"memory");
}

static _node_atomicbuffers_inline void node_atomicbuffers__write_barrier(void) {
  __asm__ __volatile__ ("dmb ishst":::"memory");
}

#else
#error "No supported memory barrier options for this build"
#endif

#endif  /* NODE_ATOMICBUFFERS_ARM64_ */
