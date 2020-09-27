// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Format = require("bs-platform/lib/js/format.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_sys = require("bs-platform/lib/js/caml_sys.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Cmdliner_trie = require("./cmdliner_trie.bs.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");
var Caml_external_polyfill = require("bs-platform/lib/js/caml_external_polyfill.js");

var err_empty_list = "empty list";

function pp_lines(ppf, s) {
  var stop_at = function (sat, _start, max, s) {
    while(true) {
      var start = _start;
      if (start > max) {
        return start;
      }
      if (Curry._1(sat, Caml_string.get(s, start))) {
        return start;
      }
      _start = start + 1 | 0;
      continue ;
    };
  };
  var sub = function (s, start, stop, max) {
    if (start === stop) {
      return "";
    } else if (start === 0 && stop > max) {
      return s;
    } else {
      return $$String.sub(s, start, stop - start | 0);
    }
  };
  var is_nl = function (c) {
    return c === /* "\n" */10;
  };
  var max = s.length - 1 | 0;
  var _start = 0;
  while(true) {
    var start = _start;
    var stop = stop_at(is_nl, start, max, s);
    if (stop > max) {
      return Format.pp_print_string(ppf, sub(s, start, stop, max));
    }
    Format.pp_print_string(ppf, sub(s, start, stop, max));
    Format.pp_force_newline(ppf, undefined);
    _start = stop + 1 | 0;
    continue ;
  };
}

function pp_tokens(spaces, ppf, s) {
  var is_space = function (param) {
    var switcher = param - 9 | 0;
    if (switcher > 4 || switcher < 0) {
      return switcher === 23;
    } else {
      return !(switcher === 3 || switcher === 2);
    }
  };
  var i_max = s.length - 1 | 0;
  var flush = function (start, stop) {
    return Format.pp_print_string(ppf, $$String.sub(s, start, (stop - start | 0) + 1 | 0));
  };
  var skip_white = function (_i) {
    while(true) {
      var i = _i;
      if (i > i_max) {
        return i;
      }
      if (!is_space(Caml_string.get(s, i))) {
        return i;
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  var _start = 0;
  var _i = 0;
  while(true) {
    var i = _i;
    var start = _start;
    if (i > i_max) {
      return flush(start, i_max);
    }
    if (is_space(Caml_string.get(s, i))) {
      var next_start = skip_white(i);
      flush(start, i - 1 | 0);
      if (spaces) {
        Format.pp_print_space(ppf, undefined);
      } else {
        Format.pp_print_char(ppf, /* " " */32);
      }
      if (next_start > i_max) {
        return ;
      }
      _i = next_start;
      _start = next_start;
      continue ;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function quote(s) {
  return Curry._1(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* Char_literal */12,
                    _0: /* "`" */96,
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* Char_literal */12,
                        _0: /* "'" */39,
                        _1: /* End_of_format */0
                      }
                    }
                  },
                  _1: "`%s'"
                }), s);
}

function alts_str(quotedOpt, alts) {
  var quoted = quotedOpt !== undefined ? quotedOpt : true;
  var quote$1 = quoted ? quote : (function (s) {
        return s;
      });
  if (!alts) {
    return Pervasives.invalid_arg(err_empty_list);
  }
  var match = alts.tl;
  var a = alts.hd;
  if (!match) {
    return Curry._1(quote$1, a);
  }
  if (!match.tl) {
    return Curry._2(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: "either ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " or ",
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: /* End_of_format */0
                          }
                        }
                      }
                    },
                    _1: "either %s or %s"
                  }), Curry._1(quote$1, a), Curry._1(quote$1, match.hd));
  }
  var rev_alts = List.rev(alts);
  return Curry._2(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "one of ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: " or ",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: /* End_of_format */0
                        }
                      }
                    }
                  },
                  _1: "one of %s or %s"
                }), $$String.concat(", ", List.rev_map(quote$1, List.tl(rev_alts))), Curry._1(quote$1, List.hd(rev_alts)));
}

function err_multi_def(kind, name, doc, v, v$prime) {
  return Curry._4(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* Char_literal */12,
                      _0: /* " " */32,
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " defined twice (doc strings are '",
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: {
                              TAG: /* String_literal */11,
                              _0: "' and '",
                              _1: {
                                TAG: /* String */2,
                                _0: /* No_padding */0,
                                _1: {
                                  TAG: /* String_literal */11,
                                  _0: "')",
                                  _1: /* End_of_format */0
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "%s %s defined twice (doc strings are '%s' and '%s')"
                }), kind, name, Curry._1(doc, v), Curry._1(doc, v$prime));
}

function err_ambiguous(kind, s, ambs) {
  return Curry._3(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* Char_literal */12,
                      _0: /* " " */32,
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " ambiguous and could be ",
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: /* End_of_format */0
                          }
                        }
                      }
                    }
                  },
                  _1: "%s %s ambiguous and could be %s"
                }), kind, quote(s), alts_str(undefined, ambs));
}

function err_unknown(hintsOpt, kind, v) {
  var hints = hintsOpt !== undefined ? hintsOpt : /* [] */0;
  var did_you_mean = function (s) {
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: {
                      TAG: /* String_literal */11,
                      _0: ", did you mean ",
                      _1: {
                        TAG: /* String */2,
                        _0: /* No_padding */0,
                        _1: {
                          TAG: /* String_literal */11,
                          _0: " ?",
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: ", did you mean %s ?"
                  }), s);
  };
  var hints$1 = hints ? did_you_mean(alts_str(undefined, hints)) : ".";
  return Curry._3(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "unknown ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* Char_literal */12,
                        _0: /* " " */32,
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: {
                            TAG: /* String */2,
                            _0: /* No_padding */0,
                            _1: /* End_of_format */0
                          }
                        }
                      }
                    }
                  },
                  _1: "unknown %s %s%s"
                }), kind, quote(v), hints$1);
}

function err_no(kind, s) {
  return Curry._2(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "no ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* Char_literal */12,
                        _0: /* " " */32,
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: /* End_of_format */0
                        }
                      }
                    }
                  },
                  _1: "no %s %s"
                }), quote(s), kind);
}

function err_not_dir(s) {
  return Curry._1(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* String_literal */11,
                      _0: " is not a directory",
                      _1: /* End_of_format */0
                    }
                  },
                  _1: "%s is not a directory"
                }), quote(s));
}

function err_is_dir(s) {
  return Curry._1(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: {
                      TAG: /* String_literal */11,
                      _0: " is a directory",
                      _1: /* End_of_format */0
                    }
                  },
                  _1: "%s is a directory"
                }), quote(s));
}

function err_element(kind, s, exp) {
  return Curry._3(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "invalid element in ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* String_literal */11,
                        _0: " (`",
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: {
                            TAG: /* String_literal */11,
                            _0: "'): ",
                            _1: {
                              TAG: /* String */2,
                              _0: /* No_padding */0,
                              _1: /* End_of_format */0
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "invalid element in %s (`%s'): %s"
                }), kind, s, exp);
}

function err_invalid(kind, s, exp) {
  return Curry._3(Printf.sprintf(/* Format */{
                  _0: {
                    TAG: /* String_literal */11,
                    _0: "invalid ",
                    _1: {
                      TAG: /* String */2,
                      _0: /* No_padding */0,
                      _1: {
                        TAG: /* Char_literal */12,
                        _0: /* " " */32,
                        _1: {
                          TAG: /* String */2,
                          _0: /* No_padding */0,
                          _1: {
                            TAG: /* String_literal */11,
                            _0: ", ",
                            _1: {
                              TAG: /* String */2,
                              _0: /* No_padding */0,
                              _1: /* End_of_format */0
                            }
                          }
                        }
                      }
                    }
                  },
                  _1: "invalid %s %s, %s"
                }), kind, quote(s), exp);
}

function err_sep_miss(sep, s) {
  return err_invalid("value", s, Curry._1(Printf.sprintf(/* Format */{
                      _0: {
                        TAG: /* String_literal */11,
                        _0: "missing a `",
                        _1: {
                          TAG: /* Char */0,
                          _0: {
                            TAG: /* String_literal */11,
                            _0: "' separator",
                            _1: /* End_of_format */0
                          }
                        }
                      },
                      _1: "missing a `%c' separator"
                    }), sep));
}

function some($staropt$star, param) {
  var print = param[1];
  var parse = param[0];
  var none = $staropt$star !== undefined ? $staropt$star : "";
  var parse$1 = function (s) {
    var e = Curry._1(parse, s);
    if (e.NAME === "Error") {
      return e;
    } else {
      return {
              NAME: "Ok",
              VAL: Caml_option.some(e.VAL)
            };
    }
  };
  var print$1 = function (ppf, v) {
    if (v !== undefined) {
      return Curry._2(print, ppf, Caml_option.valFromOption(v));
    } else {
      return Format.pp_print_string(ppf, none);
    }
  };
  return [
          parse$1,
          print$1
        ];
}

function parse(s) {
  try {
    return {
            NAME: "Ok",
            VAL: Pervasives.bool_of_string(s)
          };
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Invalid_argument") {
      return {
              NAME: "Error",
              VAL: err_invalid("value", s, alts_str(undefined, {
                        hd: "true",
                        tl: {
                          hd: "false",
                          tl: /* [] */0
                        }
                      }))
            };
    }
    throw exn;
  }
}

var bool = [
  parse,
  Format.pp_print_bool
];

function parse$1(s) {
  if (s.length === 1) {
    return {
            NAME: "Ok",
            VAL: Caml_string.get(s, 0)
          };
  } else {
    return {
            NAME: "Error",
            VAL: err_invalid("value", s, "expected a character")
          };
  }
}

var $$char = [
  parse$1,
  Format.pp_print_char
];

function parse_with(t_of_str, exp, s) {
  try {
    return {
            NAME: "Ok",
            VAL: Curry._1(t_of_str, s)
          };
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Failure") {
      return {
              NAME: "Error",
              VAL: err_invalid("value", s, exp)
            };
    }
    throw exn;
  }
}

function int_0(param) {
  return parse_with(Caml_format.caml_int_of_string, "expected an integer", param);
}

var $$int = [
  int_0,
  Format.pp_print_int
];

function int32_0(param) {
  return parse_with(Caml_format.caml_int32_of_string, "expected a 32-bit integer", param);
}

function int32_1(ppf) {
  return Format.fprintf(ppf, /* Format */{
              _0: {
                TAG: /* Int32 */5,
                _0: /* Int_d */0,
                _1: /* No_padding */0,
                _2: /* No_precision */0,
                _3: /* End_of_format */0
              },
              _1: "%ld"
            });
}

var int32 = [
  int32_0,
  int32_1
];

function int64_0(param) {
  return parse_with(Caml_format.caml_int64_of_string, "expected a 64-bit integer", param);
}

function int64_1(ppf) {
  return Format.fprintf(ppf, /* Format */{
              _0: {
                TAG: /* Int64 */7,
                _0: /* Int_d */0,
                _1: /* No_padding */0,
                _2: /* No_precision */0,
                _3: /* End_of_format */0
              },
              _1: "%Ld"
            });
}

var int64 = [
  int64_0,
  int64_1
];

function nativeint_0(param) {
  return parse_with(Caml_format.caml_nativeint_of_string, "expected a processor-native integer", param);
}

function nativeint_1(ppf) {
  return Format.fprintf(ppf, /* Format */{
              _0: {
                TAG: /* Nativeint */6,
                _0: /* Int_d */0,
                _1: /* No_padding */0,
                _2: /* No_precision */0,
                _3: /* End_of_format */0
              },
              _1: "%nd"
            });
}

var nativeint = [
  nativeint_0,
  nativeint_1
];

function float_0(param) {
  return parse_with(Caml_format.caml_float_of_string, "expected a floating point number", param);
}

var $$float = [
  float_0,
  Format.pp_print_float
];

function string_0(s) {
  return {
          NAME: "Ok",
          VAL: s
        };
}

var string = [
  string_0,
  Format.pp_print_string
];

function $$enum(sl) {
  if (sl === /* [] */0) {
    return Pervasives.invalid_arg(err_empty_list);
  }
  var t = Cmdliner_trie.of_list(sl);
  var parse = function (s) {
    var r = Cmdliner_trie.find(t, s);
    if (typeof r !== "string") {
      return r;
    }
    if (r === "Ambiguous") {
      var ambs = List.sort(Caml_primitive.caml_string_compare, Cmdliner_trie.ambiguities(t, s));
      return {
              NAME: "Error",
              VAL: err_ambiguous("enum value", s, ambs)
            };
    }
    var alts = List.rev(List.rev_map((function (param) {
                return param[0];
              }), sl));
    return {
            NAME: "Error",
            VAL: err_invalid("value", s, "expected " + alts_str(undefined, alts))
          };
  };
  var print = function (ppf, v) {
    var sl_inv = List.rev_map((function (param) {
            return [
                    param[1],
                    param[0]
                  ];
          }), sl);
    try {
      return Format.pp_print_string(ppf, List.assoc(v, sl_inv));
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        return Pervasives.invalid_arg("Incomplete enumeration for the type");
      }
      throw exn;
    }
  };
  return [
          parse,
          print
        ];
}

function parse$2(s) {
  if (Caml_external_polyfill.resolve("caml_sys_file_exists")(s)) {
    return {
            NAME: "Ok",
            VAL: s
          };
  } else {
    return {
            NAME: "Error",
            VAL: err_no("file or directory", s)
          };
  }
}

var file = [
  parse$2,
  Format.pp_print_string
];

function parse$3(s) {
  if (Caml_external_polyfill.resolve("caml_sys_file_exists")(s)) {
    if (Caml_sys.caml_sys_is_directory(s)) {
      return {
              NAME: "Ok",
              VAL: s
            };
    } else {
      return {
              NAME: "Error",
              VAL: err_not_dir(s)
            };
    }
  } else {
    return {
            NAME: "Error",
            VAL: err_no("directory", s)
          };
  }
}

var dir = [
  parse$3,
  Format.pp_print_string
];

function parse$4(s) {
  if (Caml_external_polyfill.resolve("caml_sys_file_exists")(s)) {
    if (Caml_sys.caml_sys_is_directory(s)) {
      return {
              NAME: "Error",
              VAL: err_is_dir(s)
            };
    } else {
      return {
              NAME: "Ok",
              VAL: s
            };
    }
  } else {
    return {
            NAME: "Error",
            VAL: err_no("file", s)
          };
  }
}

var non_dir_file = [
  parse$4,
  Format.pp_print_string
];

function split_and_parse(sep, parse, s) {
  var parse$1 = function (sub) {
    var match = Curry._1(parse, sub);
    if (match.NAME === "Error") {
      return Pervasives.failwith(match.VAL);
    } else {
      return match.VAL;
    }
  };
  var _accum = /* [] */0;
  var _j = s.length - 1 | 0;
  while(true) {
    var j = _j;
    var accum = _accum;
    var i;
    try {
      i = $$String.rindex_from(s, j, sep);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === "Not_found") {
        i = -1;
      } else {
        throw exn;
      }
    }
    if (i === -1) {
      var p = $$String.sub(s, 0, j + 1 | 0);
      if (p !== "") {
        return {
                hd: parse$1(p),
                tl: accum
              };
      } else {
        return accum;
      }
    }
    var p$1 = $$String.sub(s, i + 1 | 0, j - i | 0);
    var accum$prime = p$1 !== "" ? ({
          hd: parse$1(p$1),
          tl: accum
        }) : accum;
    _j = i - 1 | 0;
    _accum = accum$prime;
    continue ;
  };
}

function list($staropt$star, param) {
  var pp_e = param[1];
  var parse = param[0];
  var sep = $staropt$star !== undefined ? $staropt$star : /* "," */44;
  var parse$1 = function (s) {
    try {
      return {
              NAME: "Ok",
              VAL: split_and_parse(sep, parse, s)
            };
    }
    catch (raw_e){
      var e = Caml_js_exceptions.internalToOCamlException(raw_e);
      if (e.RE_EXN_ID === "Failure") {
        return {
                NAME: "Error",
                VAL: err_element("list", s, e._1)
              };
      }
      throw e;
    }
  };
  var print = function (ppf, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var l = param.tl;
      Curry._2(pp_e, ppf, param.hd);
      if (l === /* [] */0) {
        return ;
      }
      Format.pp_print_char(ppf, sep);
      _param = l;
      continue ;
    };
  };
  return [
          parse$1,
          print
        ];
}

function array($staropt$star, param) {
  var pp_e = param[1];
  var parse = param[0];
  var sep = $staropt$star !== undefined ? $staropt$star : /* "," */44;
  var parse$1 = function (s) {
    try {
      return {
              NAME: "Ok",
              VAL: $$Array.of_list(split_and_parse(sep, parse, s))
            };
    }
    catch (raw_e){
      var e = Caml_js_exceptions.internalToOCamlException(raw_e);
      if (e.RE_EXN_ID === "Failure") {
        return {
                NAME: "Error",
                VAL: err_element("array", s, e._1)
              };
      }
      throw e;
    }
  };
  var print = function (ppf, v) {
    var max = v.length - 1 | 0;
    for(var i = 0; i <= max; ++i){
      Curry._2(pp_e, ppf, Caml_array.caml_array_get(v, i));
      if (i !== max) {
        Format.pp_print_char(ppf, sep);
      }
      
    }
    
  };
  return [
          parse$1,
          print
        ];
}

function split_left(sep, s) {
  try {
    var i = $$String.index(s, sep);
    var len = s.length;
    return [
            $$String.sub(s, 0, i),
            $$String.sub(s, i + 1 | 0, (len - i | 0) - 1 | 0)
          ];
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return ;
    }
    throw exn;
  }
}

function pair($staropt$star, param, param$1) {
  var pr1 = param$1[1];
  var pa1 = param$1[0];
  var pr0 = param[1];
  var pa0 = param[0];
  var sep = $staropt$star !== undefined ? $staropt$star : /* "," */44;
  var parser = function (s) {
    var match = split_left(sep, s);
    if (match === undefined) {
      return {
              NAME: "Error",
              VAL: err_sep_miss(sep, s)
            };
    }
    var match$1 = Curry._1(pa0, match[0]);
    var match$2 = Curry._1(pa1, match[1]);
    if (match$1.NAME === "Error") {
      return {
              NAME: "Error",
              VAL: err_element("pair", s, match$1.VAL)
            };
    }
    if (typeof match$2 !== "string" && match$2.NAME === "Ok") {
      return {
              NAME: "Ok",
              VAL: [
                match$1.VAL,
                match$2.VAL
              ]
            };
    }
    return {
            NAME: "Error",
            VAL: err_element("pair", s, match$2.VAL)
          };
  };
  var printer = function (ppf, param) {
    return Curry._5(Format.fprintf(ppf, /* Format */{
                    _0: {
                      TAG: /* Alpha */15,
                      _0: {
                        TAG: /* Char */0,
                        _0: {
                          TAG: /* Alpha */15,
                          _0: /* End_of_format */0
                        }
                      }
                    },
                    _1: "%a%c%a"
                  }), pr0, param[0], sep, pr1, param[1]);
  };
  return [
          parser,
          printer
        ];
}

function t3($staropt$star, param, param$1, param$2) {
  var pr2 = param$2[1];
  var pa2 = param$2[0];
  var pr1 = param$1[1];
  var pa1 = param$1[0];
  var pr0 = param[1];
  var pa0 = param[0];
  var sep = $staropt$star !== undefined ? $staropt$star : /* "," */44;
  var parse = function (s) {
    var match = split_left(sep, s);
    if (match === undefined) {
      return {
              NAME: "Error",
              VAL: err_sep_miss(sep, s)
            };
    }
    var s$1 = match[1];
    var match$1 = split_left(sep, s$1);
    if (match$1 === undefined) {
      return {
              NAME: "Error",
              VAL: err_sep_miss(sep, s$1)
            };
    }
    var match$2 = Curry._1(pa0, match[0]);
    var match$3 = Curry._1(pa1, match$1[0]);
    var match$4 = Curry._1(pa2, match$1[1]);
    var e;
    var exit = 0;
    if (match$2.NAME === "Error") {
      e = match$2.VAL;
    } else if (typeof match$3 === "string" || match$3.NAME !== "Ok") {
      exit = 2;
    } else if (typeof match$4 === "string") {
      e = match$4.VAL;
    } else {
      if (match$4.NAME === "Ok") {
        return {
                NAME: "Ok",
                VAL: [
                  match$2.VAL,
                  match$3.VAL,
                  match$4.VAL
                ]
              };
      }
      e = match$4.VAL;
    }
    if (exit === 2) {
      e = typeof match$3 === "string" || match$3.NAME !== "Error" ? match$4.VAL : match$3.VAL;
    }
    return {
            NAME: "Error",
            VAL: err_element("triple", s$1, e)
          };
  };
  var print = function (ppf, param) {
    return Curry._8(Format.fprintf(ppf, /* Format */{
                    _0: {
                      TAG: /* Alpha */15,
                      _0: {
                        TAG: /* Char */0,
                        _0: {
                          TAG: /* Alpha */15,
                          _0: {
                            TAG: /* Char */0,
                            _0: {
                              TAG: /* Alpha */15,
                              _0: /* End_of_format */0
                            }
                          }
                        }
                      }
                    },
                    _1: "%a%c%a%c%a"
                  }), pr0, param[0], sep, pr1, param[1], sep, pr2, param[2]);
  };
  return [
          parse,
          print
        ];
}

function t4($staropt$star, param, param$1, param$2, param$3) {
  var pr3 = param$3[1];
  var pa3 = param$3[0];
  var pr2 = param$2[1];
  var pa2 = param$2[0];
  var pr1 = param$1[1];
  var pa1 = param$1[0];
  var pr0 = param[1];
  var pa0 = param[0];
  var sep = $staropt$star !== undefined ? $staropt$star : /* "," */44;
  var parse = function (s) {
    var match = split_left(sep, s);
    if (match === undefined) {
      return {
              NAME: "Error",
              VAL: err_sep_miss(sep, s)
            };
    }
    var s$1 = match[1];
    var match$1 = split_left(sep, s$1);
    if (match$1 === undefined) {
      return {
              NAME: "Error",
              VAL: err_sep_miss(sep, s$1)
            };
    }
    var s$2 = match$1[1];
    var match$2 = split_left(sep, s$2);
    if (match$2 === undefined) {
      return {
              NAME: "Error",
              VAL: err_sep_miss(sep, s$2)
            };
    }
    var match$3 = Curry._1(pa0, match[0]);
    var match$4 = Curry._1(pa1, match$1[0]);
    var match$5 = Curry._1(pa2, match$2[0]);
    var match$6 = Curry._1(pa3, match$2[1]);
    var e;
    var exit = 0;
    var exit$1 = 0;
    if (match$3.NAME === "Error") {
      e = match$3.VAL;
    } else if (typeof match$4 === "string" || match$4.NAME !== "Ok") {
      exit$1 = 3;
    } else if (typeof match$5 === "string" || match$5.NAME !== "Ok") {
      exit = 2;
    } else if (typeof match$6 === "string") {
      e = match$6.VAL;
    } else {
      if (match$6.NAME === "Ok") {
        return {
                NAME: "Ok",
                VAL: [
                  match$3.VAL,
                  match$4.VAL,
                  match$5.VAL,
                  match$6.VAL
                ]
              };
      }
      e = match$6.VAL;
    }
    if (exit$1 === 3) {
      if (typeof match$4 === "string" || match$4.NAME !== "Error") {
        exit = 2;
      } else {
        e = match$4.VAL;
      }
    }
    if (exit === 2) {
      e = typeof match$5 === "string" || match$5.NAME !== "Error" ? match$6.VAL : match$5.VAL;
    }
    return {
            NAME: "Error",
            VAL: err_element("quadruple", s$2, e)
          };
  };
  var print = function (ppf, param) {
    return Curry.app(Format.fprintf(ppf, /* Format */{
                    _0: {
                      TAG: /* Alpha */15,
                      _0: {
                        TAG: /* Char */0,
                        _0: {
                          TAG: /* Alpha */15,
                          _0: {
                            TAG: /* Char */0,
                            _0: {
                              TAG: /* Alpha */15,
                              _0: {
                                TAG: /* Char */0,
                                _0: {
                                  TAG: /* Alpha */15,
                                  _0: /* End_of_format */0
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    _1: "%a%c%a%c%a%c%a"
                  }), [
                pr0,
                param[0],
                sep,
                pr1,
                param[1],
                sep,
                pr2,
                param[2],
                sep,
                pr3,
                param[3]
              ]);
  };
  return [
          parse,
          print
        ];
}

function env_bool_parse(s) {
  var s$1 = $$String.lowercase_ascii(s);
  switch (s$1) {
    case "" :
    case "0" :
    case "false" :
    case "n" :
    case "no" :
        return {
                NAME: "Ok",
                VAL: false
              };
    case "1" :
    case "true" :
    case "y" :
    case "yes" :
        return {
                NAME: "Ok",
                VAL: true
              };
    default:
      return {
              NAME: "Error",
              VAL: err_invalid("value", s$1, alts_str(undefined, {
                        hd: "true",
                        tl: {
                          hd: "yes",
                          tl: {
                            hd: "false",
                            tl: {
                              hd: "no",
                              tl: /* [] */0
                            }
                          }
                        }
                      }))
            };
  }
}

var pp_text = Format.pp_print_text;

var t2 = pair;

exports.pp_text = pp_text;
exports.pp_lines = pp_lines;
exports.pp_tokens = pp_tokens;
exports.quote = quote;
exports.alts_str = alts_str;
exports.err_ambiguous = err_ambiguous;
exports.err_unknown = err_unknown;
exports.err_multi_def = err_multi_def;
exports.some = some;
exports.bool = bool;
exports.$$char = $$char;
exports.$$int = $$int;
exports.nativeint = nativeint;
exports.int32 = int32;
exports.int64 = int64;
exports.$$float = $$float;
exports.string = string;
exports.$$enum = $$enum;
exports.file = file;
exports.dir = dir;
exports.non_dir_file = non_dir_file;
exports.list = list;
exports.array = array;
exports.pair = pair;
exports.t2 = t2;
exports.t3 = t3;
exports.t4 = t4;
exports.env_bool_parse = env_bool_parse;
/* Format Not a pure module */
