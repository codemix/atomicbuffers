{
  "targets": [{
    "target_name": "atomicbuffers",
    "include_dirs": [
      "src",
      "<!(node -e \"require('nan')\")",
    ],
    "sources": [
      "src/atomicbuffers.cc"
    ]
  }],
}
