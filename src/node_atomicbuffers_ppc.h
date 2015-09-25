#ifndef NODE_ATOMICBUFFERS_PPC_
#define NODE_ATOMICBUFFERS_PPC_

#if defined(__GNUC__)

static _node_atomicbuffers_inline void node_atomicbuffers__read_barrier(void) {
  __asm__ __volatile__  ("lwsync":::"memory");
}

static _node_atomicbuffers_inline void node_atomicbuffers__write_barrier(void) {
  __asm__ __volatile__  ("eieio":::"memory");
}

#elif defined(__xlC__)

/* The following taken from
 * http://www.ibm.com/developerworks/systems/articles/powerpc.html#N103E8 */
#pragma mc_func node_atomicbuffers__read_barrier { "7c2004ac" }  /* lwsync */
#pragma mc_func node_atomicbuffers__write_barrier { "4c00012c" }  /* isync  */

#else
#error "No supported memory barrier options for this build"
#endif

#endif  /* NODE_ATOMICBUFFERS_PPC_ */
