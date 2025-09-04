/**
 * @file parsing hotcrp offline review files
 * @author Wenxuan Shi <whexy@outlook.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "hotcrp",

  // Keep newlines as extras so we can write line-based rules cleanly
  extras: ($) => [/[ \t]+/],

  rules: {
    source_file: ($) => seq(repeat($.preamble_block), repeat($.section)),

    // Before the first section: allow meta_line/comment_line or free-form blocks
    preamble_block: ($) =>
      choice($.meta_line, $.comment_line, $.block, $.blank),

    section: ($) =>
      prec.right(
        seq(
          $.section_header,
          repeat(choice($.meta_line, $.comment_line, $.block, $.blank)),
        ),
      ),

    // Marked lines
    section_header: ($) =>
      prec.left(seq("==*==", $.marker_text, optional($._nl))),
    meta_line: ($) => prec.left(seq("==+==", $.marker_text, optional($._nl))),
    comment_line: ($) =>
      prec.left(seq("==-==", $.marker_text, optional($._nl))),
    marker_text: (_) => token.immediate(/[ \t]*[^\n]+/),

    // Regular block
    block: ($) =>
      prec.right(
        seq($.line, repeat(choice($.line, $.blank)), optional($.text)),
      ),
    line: ($) => seq($.text, $._nl),
    blank: ($) => seq(optional(/[ \t]+/), $._nl),

    text: (_) =>
      token(
        /(?:[^=\n][^\n]*|=[^=\n][^\n]*|==[^*+\-\n][^\n]*|==[*+\-][^=\n][^\n]*|==[*+\-]=[^=\n][^\n]*)/,
      ),
    _nl: (_) => /\r?\n/,
  },
});
