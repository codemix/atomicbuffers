#ifndef NODE_ATOMICBUFFERS_GNUC_GENERIC_
#define NODE_ATOMICBUFFERS_GNUC_GENERIC_

static _node_atomicbuffers_inline void node_atomicbuffers__read_barrier(void) {
  __sync_synchronize();
}

static _node_atomicbuffers_inline void node_atomicbuffers__write_barrier(void) {
  __sync_synchronize();
}

#endif  /* NODE_ATOMICBUFFERS_GNUC_GENERIC_ */
