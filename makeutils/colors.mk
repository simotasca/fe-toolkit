label_blue    = bash -c 'label="$$1"; sed "s/^/[\x1b[34m$${label}\x1b[0m] /"' _
label_yellow  = bash -c 'label="$$1"; sed "s/^/[\x1b[33m$${label}\x1b[0m] /"' _
label_green   = bash -c 'label="$$1"; sed "s/^/[\x1b[32m$${label}\x1b[0m] /"' _
label_red     = bash -c 'label="$$1"; sed "s/^/[\x1b[31m$${label}\x1b[0m] /"' _
label_white   = bash -c 'label="$$1"; sed "s/^/[\x1b[37m$${label}\x1b[0m] /"' _
label_magenta = bash -c 'label="$$1"; sed "s/^/[\x1b[35m$${label}\x1b[0m] /"' _
label_cyan    = bash -c 'label="$$1"; sed "s/^/[\x1b[36m$${label}\x1b[0m] /"' _
