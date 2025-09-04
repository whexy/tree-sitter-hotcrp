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
  extras: ($) => [/\r?\n/],

  rules: {
    source_file: ($) => seq(repeat($.preamble_line), repeat($.section)),

    // Lines that are allowed only before the first section
    preamble_line: ($) => choice($.metadata, $.comment, $.regular_line),

    // A section: header followed by any number of non-header lines.
    section: ($) =>
      prec.right(
        seq(
          field("header", $.section_header),
          repeat(choice($.metadata, $.comment, $.regular_line)),
        ),
      ),

    // Marked line types — assume the markers start at the beginning of the line
    section_header: ($) => seq("==*==", field("text", $.line_text)),
    metadata: ($) => seq("==+==", field("text", $.line_text)),
    comment: ($) => seq("==-==", field("text", $.line_text)),

    // Regular line: any line that DOES NOT start with '='.
    // This avoids lookahead; if a line starts with '=', one of the marked rules will match it first.
    regular_line: ($) => field("text", $.line_text_nostart_eq),

    // Text after a marker: optional space(s) then the payload (non-newline)
    line_text: (_) => token.immediate(/[ \t]*[^\n]+/),

    // A non-marker line: first char is NOT '=' (then the rest until newline)
    line_text_nostart_eq: (_) => token(/[^=\n][^\n]*/),
  },
});
