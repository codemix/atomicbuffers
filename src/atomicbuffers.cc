#include "node.h"
#include "node_buffer.h"
#include "v8.h"
#include "nan.h"
#include "errno.h"


/* Prevent warnings when compiled with --std=gnu89 -pedantic */
#if defined (__STRICT_ANSI__) || defined (__GNUC_GNU_INLINE__)
# define _node_atomicbuffers_inline __inline__
#else
# define _node_atomicbuffers_inline inline
#endif
#include "node_atomicbuffers_defs.h"

#include <unistd.h>


namespace node {
namespace node_atomicbuffers {

using v8::Handle;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;


NAN_METHOD(ReadInt32) {
  Nan::HandleScope scope;
  if (!node::Buffer::HasInstance(info[0]))
    return;

  const size_t offset = info[1]->IntegerValue();

  char* const ptr = node::Buffer::Data(info[0]) + offset;
  int32_t* o = reinterpret_cast<int32_t*>(ptr);

  int32_t value;
  NODE_ATOMICBUFFERS_LOAD_VALUE(value, *o);

  info.GetReturnValue().Set(value);
}


NAN_METHOD(ReadUInt32) {
  Nan::HandleScope scope;
  if (!node::Buffer::HasInstance(info[0]))
    return;

  const size_t offset = info[1]->IntegerValue();

  char* const ptr = node::Buffer::Data(info[0]) + offset;
  int32_t* o = reinterpret_cast<int32_t*>(ptr);

  uint32_t value;
  NODE_ATOMICBUFFERS_LOAD_VALUE(value, *o);

  info.GetReturnValue().Set(value);
}


NAN_METHOD(WriteInt32) {
  Nan::HandleScope scope;
  if (!node::Buffer::HasInstance(info[0]))
    return;

  const size_t offset = info[2]->IntegerValue();
  char* const ptr = node::Buffer::Data(info[0]) + offset;
  const int32_t value = info[1]->Uint32Value();

  int32_t* o = reinterpret_cast<int32_t*>(ptr);
  NODE_ATOMICBUFFERS_STORE_VALUE(*o, value);
  info.GetReturnValue().Set(static_cast<uint32_t>(offset) + 4);
}


NAN_METHOD(WriteUInt32) {
  Nan::HandleScope scope;
  if (!node::Buffer::HasInstance(info[0]))
    return;

  const size_t offset = info[2]->IntegerValue();
  char* const ptr = node::Buffer::Data(info[0]) + offset;
  const uint32_t value = info[1]->Uint32Value();

  uint32_t* o = reinterpret_cast<uint32_t*>(ptr);
  NODE_ATOMICBUFFERS_STORE_VALUE(*o, value);
  info.GetReturnValue().Set(static_cast<uint32_t>(offset) + 4);
}


static void Init(Handle<Object> target) {
  Nan::SetMethod(target, "readInt32", ReadInt32);
  Nan::SetMethod(target, "readUInt32", ReadUInt32);
  Nan::SetMethod(target, "writeInt32", WriteInt32);
  Nan::SetMethod(target, "writeUInt32", WriteUInt32);

}


}  // namespace node_atomicbuffers
}  // namespace node

NODE_MODULE(atomicbuffers, node::node_atomicbuffers::Init);
