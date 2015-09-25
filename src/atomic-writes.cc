#include "node.h"
#include "node_buffer.h"
#include "v8.h"
#include "nan.h"
#include "errno.h"

#include <unistd.h>

namespace node {
namespace node_atomicwrites {

using v8::Handle;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;

NAN_METHOD(WriteInt) {
  Nan::HandleScope scope;
  char* ptr = node::Buffer::Data(info[0]->ToObject());
  int value = info[1]->Uint32Value();
  int offset = info[2]->Uint32Value();
  ptr = ptr + offset;
  *ptr = value;
  info.GetReturnValue().Set(value);
}




static void Init(Handle<Object> target) {
  Nan::SetMethod(target, "writeInt", WriteInt);
}


}  // namespace node_atomicwrites
}  // namespace node

NODE_MODULE(atomicwrites, node::node_atomicwrites::Init);
