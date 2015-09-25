{
  "targets": [{
    "target_name": "atomic-writes",
    "include_dirs": [
      "src",
      "<!(node -e \"require('nan')\")",
    ],
    "sources": [
      "src/atomic-writes.cc",
    ],
  }],
}
