// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Format = require("bs-platform/lib/js/format.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Printexc = require("bs-platform/lib/js/printexc.js");
var Cmdliner_base = require("./cmdliner_base.bs.js");
var Cmdliner_info = require("./cmdliner_info.bs.js");
var Cmdliner_docgen = require("./cmdliner_docgen.bs.js");

function err_env_parse(env, err) {
  var $$var = Cmdliner_info.env_var(env);
  return Curry._2(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "environment variable ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: ": ",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: /* End_of_format */0
                        }
                      }
                    }
                  },
                  _1: "environment variable %s: %s"
                }), Cmdliner_base.quote($$var), err);
}

function err_pos_excess(excess) {
  return Curry._1(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "too many arguments, don't know what to do with ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: /* End_of_format */0
                    }
                  },
                  _1: "too many arguments, don't know what to do with %s"
                }), $$String.concat(", ", List.map(Cmdliner_base.quote, excess)));
}

function err_pos_miss(a) {
  var v = Cmdliner_info.arg_docv(a);
  if (v === "") {
    return "a required argument is missing";
  } else {
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: "required argument ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " is missing",
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: "required argument %s is missing"
                  }), v);
  }
}

function err_pos_misses(args) {
  if (args) {
    if (!args.tl) {
      return err_pos_miss(args.hd);
    }
    var add_arg = function (acc, a) {
      var argv = Cmdliner_info.arg_docv(a);
      if (argv === "") {
        return {
                hd: "ARG",
                tl: acc
              };
      } else {
        return {
                hd: argv,
                tl: acc
              };
      }
    };
    var rev_args = List.sort(Cmdliner_info.rev_arg_pos_cli_order, args);
    var args$1 = List.fold_left(add_arg, /* [] */0, rev_args);
    var args$2 = $$String.concat(", ", args$1);
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: "required arguments ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " are missing",
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: "required arguments %s are missing"
                  }), args$2);
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "cmdliner_msg.ml",
          31,
          8
        ],
        Error: new Error()
      };
}

function err_pos_parse(a, err) {
  var argv = Cmdliner_info.arg_docv(a);
  if (argv === "") {
    return err;
  }
  var match = Cmdliner_info.pos_len(Cmdliner_info.arg_pos(a));
  if (match === 1) {
    return Curry._2(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: " argument: ",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: "%s argument: %s"
                  }), argv, err);
  }
  return Curry._2(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* String_literal */11,
                      _0: "... arguments: ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: /* End_of_format */0
                      }
                    }
                  },
                  _1: "%s... arguments: %s"
                }), argv, err);
}

function err_flag_value(flag, v) {
  return Curry._2(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "option ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: " is a flag, it cannot take the argument ",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: /* End_of_format */0
                        }
                      }
                    }
                  },
                  _1: "option %s is a flag, it cannot take the argument %s"
                }), Cmdliner_base.quote(flag), Cmdliner_base.quote(v));
}

function err_opt_value_missing(f) {
  return Curry._1(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "option ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: " needs an argument",
                        _1: /* End_of_format */0
                      }
                    }
                  },
                  _1: "option %s needs an argument"
                }), Cmdliner_base.quote(f));
}

function err_opt_parse(f, err) {
  return Curry._2(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "option ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: ": ",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: /* End_of_format */0
                        }
                      }
                    }
                  },
                  _1: "option %s: %s"
                }), Cmdliner_base.quote(f), err);
}

function err_opt_repeated(f, f$prime) {
  if (f === f$prime) {
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: "option ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " cannot be repeated",
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: "option %s cannot be repeated"
                  }), Cmdliner_base.quote(f));
  } else {
    return Curry._2(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: "options ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " and ",
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: {
                              TAG: /* String_literal */11,
                              _0: " cannot be present at the same time",
                              _1: /* End_of_format */0
                            }
                          }
                        }
                      }
                    },
                    _1: "options %s and %s cannot be present at the same time"
                  }), Cmdliner_base.quote(f), Cmdliner_base.quote(f$prime));
  }
}

function err_arg_missing(a) {
  if (Cmdliner_info.arg_is_pos(a)) {
    return err_pos_miss(a);
  } else {
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: "required option ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " is missing",
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: "required option %s is missing"
                  }), Cmdliner_info.arg_opt_name_sample(a));
  }
}

function pp_version(ppf, ei) {
  var v = Cmdliner_info.term_version(Cmdliner_info.eval_main(ei));
  if (v !== undefined) {
    return Curry._2(Format.fprintf(ppf, /* Format */{
                    _0: {
                      TAG: /* Formatting_gen */18,
                      _0: {
                        TAG: /* Open_box */1,
                        _0: /* Format */{
                          _0: /* End_of_format */0,
                          _1: ""
                        }
                      },
                      _1: {
                        TAG: /* Alpha */15,
                        _0: {
                          TAG: /* Formatting_lit */17,
                          _0: /* Close_box */0,
                          _1: {
                            TAG: /* Formatting_lit */17,
                            _0: /* Flush_newline */4,
                            _1: /* End_of_format */0
                          }
                        }
                      }
                    },
                    _1: "@[%a@]@."
                  }), Cmdliner_base.pp_text, v);
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "cmdliner_msg.ml",
          74,
          10
        ],
        Error: new Error()
      };
}

function pp_try_help(ppf, ei) {
  var match = Cmdliner_info.eval_kind(ei);
  if (match !== "Multiple_sub") {
    return Curry._1(Format.fprintf(ppf, /* Format */{
                    _0: {
                      TAG: /* Formatting_gen */18,
                      _0: {
                        TAG: /* Open_box */1,
                        _0: /* Format */{
                          _0: {
                            TAG: /* String_literal */11,
                            _0: "<2>",
                            _1: /* End_of_format */0
                          },
                          _1: "<2>"
                        }
                      },
                      _1: {
                        TAG: /* String_literal */11,
                        _0: "Try `",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: {
                            TAG: /* String_literal */11,
                            _0: " --help' for more information.",
                            _1: {
                              TAG: /* Formatting_lit */17,
                              _0: /* Close_box */0,
                              _1: /* End_of_format */0
                            }
                          }
                        }
                      }
                    },
                    _1: "@[<2>Try `%s --help' for more information.@]"
                  }), Cmdliner_info.term_name(Cmdliner_info.eval_main(ei)));
  }
  var exec_cmd = Cmdliner_docgen.plain_invocation(ei);
  return Curry._2(Format.fprintf(ppf, /* Format */{
                  _0: {
                    TAG: /* Formatting_gen */18,
                    _0: {
                      TAG: /* Open_box */1,
                      _0: /* Format */{
                        _0: {
                          TAG: /* String_literal */11,
                          _0: "<2>",
                          _1: /* End_of_format */0
                        },
                        _1: "<2>"
                      }
                    },
                    _1: {
                      TAG: /* String_literal */11,
                      _0: "Try `",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " --help' or `",
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: {
                              TAG: /* String_literal */11,
                              _0: " --help' for more information.",
                              _1: {
                                TAG: /* Formatting_lit */17,
                                _0: /* Close_box */0,
                                _1: /* End_of_format */0
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "@[<2>Try `%s --help' or `%s --help' for more information.@]"
                }), exec_cmd, Cmdliner_info.term_name(Cmdliner_info.eval_main(ei)));
}

function pp_err(ppf, ei, err) {
  return Curry._3(Format.fprintf(ppf, /* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* String_literal */11,
                      _0: ": ",
                      _1: {
                        TAG: /* Formatting_gen */18,
                        _0: {
                          TAG: /* Open_box */1,
                          _0: /* Format */{
                            _0: /* End_of_format */0,
                            _1: ""
                          }
                        },
                        _1: {
                          TAG: /* Alpha */15,
                          _0: {
                            TAG: /* Formatting_lit */17,
                            _0: /* Close_box */0,
                            _1: {
                              TAG: /* Formatting_lit */17,
                              _0: /* Flush_newline */4,
                              _1: /* End_of_format */0
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "%s: @[%a@]@."
                }), Cmdliner_info.term_name(Cmdliner_info.eval_main(ei)), Cmdliner_base.pp_lines, err);
}

function pp_err_usage(ppf, ei, err_lines, err) {
  var pp_err = err_lines ? Cmdliner_base.pp_lines : Cmdliner_base.pp_text;
  return Curry._7(Format.fprintf(ppf, /* Format */{
                  _0: {
                    TAG: /* Formatting_gen */18,
                    _0: {
                      TAG: /* Open_box */1,
                      _0: /* Format */{
                        _0: {
                          TAG: /* String_literal */11,
                          _0: "<v>",
                          _1: /* End_of_format */0
                        },
                        _1: "<v>"
                      }
                    },
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: ": ",
                        _1: {
                          TAG: /* Formatting_gen */18,
                          _0: {
                            TAG: /* Open_box */1,
                            _0: /* Format */{
                              _0: /* End_of_format */0,
                              _1: ""
                            }
                          },
                          _1: {
                            TAG: /* Alpha */15,
                            _0: {
                              TAG: /* Formatting_lit */17,
                              _0: /* Close_box */0,
                              _1: {
                                TAG: /* Formatting_lit */17,
                                _0: {
                                  TAG: /* Break */0,
                                  _0: "@,",
                                  _1: 0,
                                  _2: 0
                                },
                                _1: {
                                  TAG: /* Formatting_gen */18,
                                  _0: {
                                    TAG: /* Open_box */1,
                                    _0: /* Format */{
                                      _0: /* End_of_format */0,
                                      _1: ""
                                    }
                                  },
                                  _1: {
                                    TAG: /* String_literal */11,
                                    _0: "Usage: ",
                                    _1: {
                                      TAG: /* Formatting_gen */18,
                                      _0: {
                                        TAG: /* Open_box */1,
                                        _0: /* Format */{
                                          _0: /* End_of_format */0,
                                          _1: ""
                                        }
                                      },
                                      _1: {
                                        TAG: /* Alpha */15,
                                        _0: {
                                          TAG: /* Formatting_lit */17,
                                          _0: /* Close_box */0,
                                          _1: {
                                            TAG: /* Formatting_lit */17,
                                            _0: /* Close_box */0,
                                            _1: {
                                              TAG: /* Formatting_lit */17,
                                              _0: {
                                                TAG: /* Break */0,
                                                _0: "@,",
                                                _1: 0,
                                                _2: 0
                                              },
                                              _1: {
                                                TAG: /* Alpha */15,
                                                _0: {
                                                  TAG: /* Formatting_lit */17,
                                                  _0: /* Close_box */0,
                                                  _1: {
                                                    TAG: /* Formatting_lit */17,
                                                    _0: /* Flush_newline */4,
                                                    _1: /* End_of_format */0
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "@[<v>%s: @[%a@]@,@[Usage: @[%a@]@]@,%a@]@."
                }), Cmdliner_info.term_name(Cmdliner_info.eval_main(ei)), pp_err, err, (function (param, param$1) {
                return Cmdliner_docgen.pp_plain_synopsis(ppf, param, param$1);
              }), ei, pp_try_help, ei);
}

function pp_backtrace(ppf, ei, e, bt) {
  var bt$1 = Printexc.raw_backtrace_to_string(bt);
  var len = bt$1.length;
  var bt$2 = len > 0 ? $$String.sub(bt$1, 0, len - 1 | 0) : bt$1;
  return Curry._3(Format.fprintf(ppf, /* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* String_literal */11,
                      _0: ": ",
                      _1: {
                        TAG: /* Formatting_gen */18,
                        _0: {
                          TAG: /* Open_box */1,
                          _0: /* Format */{
                            _0: /* End_of_format */0,
                            _1: ""
                          }
                        },
                        _1: {
                          TAG: /* String_literal */11,
                          _0: "internal error, uncaught exception:",
                          _1: {
                            TAG: /* Formatting_lit */17,
                            _0: /* Force_newline */3,
                            _1: {
                              TAG: /* Alpha */15,
                              _0: {
                                TAG: /* Formatting_lit */17,
                                _0: /* Close_box */0,
                                _1: {
                                  TAG: /* Formatting_lit */17,
                                  _0: /* Flush_newline */4,
                                  _1: /* End_of_format */0
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "%s: @[internal error, uncaught exception:@\n%a@]@."
                }), Cmdliner_info.term_name(Cmdliner_info.eval_main(ei)), Cmdliner_base.pp_lines, Curry._2(Printf.sprintf(/* Format */{
                      _0: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* Char_literal */12,
                          _0: /* "\n" */10,
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: /* End_of_format */0
                          }
                        }
                      },
                      _1: "%s\n%s"
                    }), Printexc.to_string(e), bt$2));
}

exports.err_env_parse = err_env_parse;
exports.err_pos_excess = err_pos_excess;
exports.err_pos_misses = err_pos_misses;
exports.err_pos_parse = err_pos_parse;
exports.err_flag_value = err_flag_value;
exports.err_opt_value_missing = err_opt_value_missing;
exports.err_opt_parse = err_opt_parse;
exports.err_opt_repeated = err_opt_repeated;
exports.err_arg_missing = err_arg_missing;
exports.pp_version = pp_version;
exports.pp_try_help = pp_try_help;
exports.pp_err = pp_err;
exports.pp_err_usage = pp_err_usage;
exports.pp_backtrace = pp_backtrace;
/* Format Not a pure module */