; Header line and its payload
(section_header) @markup.heading
(section_header (line_text) @string)

; Metadata line and its payload
(metadata) @constant.macro
(metadata (line_text) @string.special)

; Comment line and its payload
(comment) @comment
(comment (line_text) @comment)

; Regular line
(regular_line (line_text_nostart_eq) @string)
