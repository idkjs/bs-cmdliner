// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Printf = require("bs-platform/lib/js/printf.js");
var $$String = require("bs-platform/lib/js/string.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Cmdliner_msg = require("./cmdliner_msg.bs.js");
var Cmdliner_base = require("./cmdliner_base.bs.js");
var Cmdliner_info = require("./cmdliner_info.bs.js");
var Cmdliner_trie = require("./cmdliner_trie.bs.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var Cmdliner_suggest = require("./cmdliner_suggest.bs.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function err_multi_opt_name_def(name, a, a$prime) {
  return Cmdliner_base.err_multi_def("option name", name, Cmdliner_info.arg_doc, a, a$prime);
}

var Amap = $$Map.Make(Cmdliner_info.Arg);

function get_arg(cl, a) {
  try {
    return Curry._2(Amap.find, a, cl);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "cmdliner_cline.ml",
              27,
              56
            ],
            Error: new Error()
          };
    }
    throw exn;
  }
}

function opt_arg(cl, a) {
  var l = get_arg(cl, a);
  if (!l.TAG) {
    return l._0;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "cmdliner_cline.ml",
          28,
          59
        ],
        Error: new Error()
      };
}

function pos_arg(cl, a) {
  var l = get_arg(cl, a);
  if (l.TAG) {
    return l._0;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "cmdliner_cline.ml",
          29,
          59
        ],
        Error: new Error()
      };
}

function actual_args(cl, a) {
  var args = get_arg(cl, a);
  if (args.TAG) {
    return args._0;
  }
  var extract_args = function (param) {
    var value = param[2];
    return {
            hd: param[1],
            tl: value !== undefined ? ({
                  hd: Caml_option.valFromOption(value),
                  tl: /* [] */0
                }) : /* [] */0
          };
  };
  return List.concat(List.map(extract_args, args._0));
}

function arg_info_indexes(args) {
  var _optidx = Cmdliner_trie.empty;
  var _posidx = /* [] */0;
  var _cl = Amap.empty;
  var _param = Curry._1(Cmdliner_info.Args.elements, args);
  while(true) {
    var param = _param;
    var cl = _cl;
    var posidx = _posidx;
    var optidx = _optidx;
    if (!param) {
      return [
              optidx,
              posidx,
              cl
            ];
    }
    var l = param.tl;
    var a = param.hd;
    if (Cmdliner_info.arg_is_pos(a)) {
      _param = l;
      _cl = Curry._3(Amap.add, a, {
            TAG: /* P */1,
            _0: /* [] */0
          }, cl);
      _posidx = {
        hd: a,
        tl: posidx
      };
      continue ;
    }
    var add = (function(a){
    return function add(t, name) {
      var match = Cmdliner_trie.add(t, name, a);
      if (match.NAME === "New") {
        return match.VAL;
      } else {
        return Pervasives.invalid_arg(err_multi_opt_name_def(name, a, match.VAL[0]));
      }
    }
    }(a));
    var names = Cmdliner_info.arg_opt_names(a);
    var optidx$1 = List.fold_left(add, optidx, names);
    _param = l;
    _cl = Curry._3(Amap.add, a, {
          TAG: /* O */0,
          _0: /* [] */0
        }, cl);
    _optidx = optidx$1;
    continue ;
  };
}

function is_opt(s) {
  if (s.length > 1) {
    return Caml_string.get(s, 0) === /* "-" */45;
  } else {
    return false;
  }
}

function is_short_opt(s) {
  if (s.length === 2) {
    return Caml_string.get(s, 0) === /* "-" */45;
  } else {
    return false;
  }
}

function parse_opt_arg(s) {
  var l = s.length;
  if (Caml_string.get(s, 1) !== /* "-" */45) {
    if (l === 2) {
      return [
              s,
              undefined
            ];
    } else {
      return [
              $$String.sub(s, 0, 2),
              $$String.sub(s, 2, l - 2 | 0)
            ];
    }
  }
  try {
    var i = $$String.index(s, /* "=" */61);
    return [
            $$String.sub(s, 0, i),
            $$String.sub(s, i + 1 | 0, (l - i | 0) - 1 | 0)
          ];
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return [
              s,
              undefined
            ];
    }
    throw exn;
  }
}

function hint_matching_opt(optidx, s) {
  if (s.length <= 2) {
    return /* [] */0;
  }
  var match = Caml_string.get(s, 1) !== /* "-" */45 ? [
      s,
      Curry._1(Printf.sprintf(/* Format */{
                _0: {
                  TAG: /* Char_literal */12,
                  _0: /* "-" */45,
                  _1: {
                    TAG: /* String */2,
                    _0: /* No_padding */0,
                    _1: /* End_of_format */0
                  }
                },
                _1: "-%s"
              }), s)
    ] : [
      $$String.sub(s, 1, s.length - 1 | 0),
      s
    ];
  var match$1 = parse_opt_arg(match[0]);
  var short_opt = match$1[0];
  var match$2 = parse_opt_arg(match[1]);
  var all = Cmdliner_trie.ambiguities(optidx, "-");
  var match$3 = List.mem(short_opt, all);
  var match$4 = Cmdliner_suggest.value(match$2[0], all);
  if (match$3) {
    if (match$4) {
      if (List.mem(short_opt, match$4)) {
        return match$4;
      } else {
        return {
                hd: short_opt,
                tl: match$4
              };
      }
    } else {
      return {
              hd: short_opt,
              tl: /* [] */0
            };
    }
  } else if (match$4) {
    return match$4;
  } else {
    return /* [] */0;
  }
}

function parse_opt_args(peek_opts, optidx, cl, args) {
  var loop = function (_errs, _k, _cl, _pargs, _param) {
    while(true) {
      var param = _param;
      var pargs = _pargs;
      var cl = _cl;
      var k = _k;
      var errs = _errs;
      if (!param) {
        return [
                List.rev(errs),
                cl,
                List.rev(pargs)
              ];
      }
      var s = param.hd;
      if (s === "--") {
        return [
                List.rev(errs),
                cl,
                List.rev_append(pargs, param.tl)
              ];
      }
      var args = param.tl;
      if (is_opt(s)) {
        var match = parse_opt_arg(s);
        var value = match[1];
        var name = match[0];
        var match$1 = Cmdliner_trie.find(optidx, name);
        if (typeof match$1 === "string") {
          if (match$1 === "Ambiguous") {
            var ambs = Cmdliner_trie.ambiguities(optidx, name);
            var ambs$1 = List.sort(Caml_primitive.caml_string_compare, ambs);
            var err = Cmdliner_base.err_ambiguous("option", name, ambs$1);
            _param = args;
            _k = k + 1 | 0;
            _errs = {
              hd: err,
              tl: errs
            };
            continue ;
          }
          if (peek_opts) {
            _param = args;
            _k = k + 1 | 0;
            continue ;
          }
          var hints = hint_matching_opt(optidx, s);
          var err$1 = Cmdliner_base.err_unknown(hints, "option", name);
          _param = args;
          _k = k + 1 | 0;
          _errs = {
            hd: err$1,
            tl: errs
          };
          continue ;
        }
        var a = match$1.VAL;
        var match$2 = Cmdliner_info.arg_opt_kind(a);
        var match$3;
        if (value !== undefined) {
          match$3 = typeof match$2 === "number" && !(match$2 !== 0 || !is_short_opt(name)) ? [
              undefined,
              {
                hd: "-" + value,
                tl: args
              }
            ] : [
              value,
              args
            ];
        } else {
          var exit = 0;
          if (typeof match$2 === "number" && match$2 === 0) {
            match$3 = [
              value,
              args
            ];
          } else {
            exit = 1;
          }
          if (exit === 1) {
            if (args) {
              var v = args.hd;
              match$3 = is_opt(v) ? [
                  undefined,
                  args
                ] : [
                  v,
                  args.tl
                ];
            } else {
              match$3 = [
                undefined,
                args
              ];
            }
          }
          
        }
        var arg = {
          TAG: /* O */0,
          _0: {
            hd: [
              k,
              name,
              match$3[0]
            ],
            tl: opt_arg(cl, a)
          }
        };
        _param = match$3[1];
        _cl = Curry._3(Amap.add, a, arg, cl);
        _k = k + 1 | 0;
        continue ;
      }
      _param = args;
      _pargs = {
        hd: s,
        tl: pargs
      };
      _k = k + 1 | 0;
      continue ;
    };
  };
  var match = loop(/* [] */0, 0, cl, /* [] */0, args);
  var pargs = match[2];
  var cl$1 = match[1];
  var errs = match[0];
  if (errs === /* [] */0) {
    return {
            TAG: /* Ok */0,
            _0: [
              cl$1,
              pargs
            ]
          };
  }
  var err = $$String.concat("\n", errs);
  return {
          TAG: /* Error */1,
          _0: [
            err,
            cl$1,
            pargs
          ]
        };
}

function take_range(start, stop, l) {
  var _i = 0;
  var _acc = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var acc = _acc;
    var i = _i;
    if (!param) {
      return List.rev(acc);
    }
    var vs = param.tl;
    if (i < start) {
      _param = vs;
      _i = i + 1 | 0;
      continue ;
    }
    if (i > stop) {
      return List.rev(acc);
    }
    _param = vs;
    _acc = {
      hd: param.hd,
      tl: acc
    };
    _i = i + 1 | 0;
    continue ;
  };
}

function create(peek_optsOpt, al, args) {
  var peek_opts = peek_optsOpt !== undefined ? peek_optsOpt : false;
  var match = arg_info_indexes(al);
  var match$1 = parse_opt_args(peek_opts, match[0], match[2], args);
  if (match$1.TAG) {
    var match$2 = match$1._0;
    return {
            TAG: /* Error */1,
            _0: [
              match$2[0],
              match$2[1]
            ]
          };
  }
  var match$3 = match$1._0;
  var cl = match$3[0];
  if (peek_opts) {
    return {
            TAG: /* Ok */0,
            _0: cl
          };
  } else {
    var posidx = match[1];
    var pargs = match$3[1];
    if (pargs === /* [] */0) {
      var misses = List.filter(Cmdliner_info.arg_is_req)(posidx);
      if (misses === /* [] */0) {
        return {
                TAG: /* Ok */0,
                _0: cl
              };
      } else {
        return {
                TAG: /* Error */1,
                _0: [
                  Cmdliner_msg.err_pos_misses(misses),
                  cl
                ]
              };
      }
    }
    var last = List.length(pargs) - 1 | 0;
    var pos = function (rev, k) {
      if (rev) {
        return last - k | 0;
      } else {
        return k;
      }
    };
    var loop = function (_misses, _cl, _max_spec, _param) {
      while(true) {
        var param = _param;
        var max_spec = _max_spec;
        var cl = _cl;
        var misses = _misses;
        if (!param) {
          return [
                  misses,
                  cl,
                  max_spec
                ];
        }
        var a = param.hd;
        var apos = Cmdliner_info.arg_pos(a);
        var rev = Cmdliner_info.pos_rev(apos);
        var start = pos(rev, Cmdliner_info.pos_start(apos));
        var n = Cmdliner_info.pos_len(apos);
        var stop = n !== undefined ? pos(rev, (Cmdliner_info.pos_start(apos) + n | 0) - 1 | 0) : pos(rev, last);
        var match = rev ? [
            stop,
            start
          ] : [
            start,
            stop
          ];
        var stop$1 = match[1];
        var args = take_range(match[0], stop$1, pargs);
        var max_spec$1 = stop$1 > max_spec ? stop$1 : max_spec;
        var cl$1 = Curry._3(Amap.add, a, {
              TAG: /* P */1,
              _0: args
            }, cl);
        var misses$1 = Cmdliner_info.arg_is_req(a) && args === /* [] */0 ? ({
              hd: a,
              tl: misses
            }) : misses;
        _param = param.tl;
        _max_spec = max_spec$1;
        _cl = cl$1;
        _misses = misses$1;
        continue ;
      };
    };
    var match$4 = loop(/* [] */0, cl, -1, posidx);
    var max_spec = match$4[2];
    var cl$1 = match$4[1];
    var misses$1 = match$4[0];
    if (misses$1 !== /* [] */0) {
      return {
              TAG: /* Error */1,
              _0: [
                Cmdliner_msg.err_pos_misses(misses$1),
                cl$1
              ]
            };
    }
    if (last <= max_spec) {
      return {
              TAG: /* Ok */0,
              _0: cl$1
            };
    }
    var excess = take_range(max_spec + 1 | 0, last, pargs);
    return {
            TAG: /* Error */1,
            _0: [
              Cmdliner_msg.err_pos_excess(excess),
              cl$1
            ]
          };
  }
}

exports.create = create;
exports.opt_arg = opt_arg;
exports.pos_arg = pos_arg;
exports.actual_args = actual_args;
/* Amap Not a pure module */
