; Header line and its payload
(section_header) @markup.heading
(section_header (marker_text) @text.title)

; Metadata line and its payload
(meta_line) @constant.macro
(meta_line (marker_text) @string.special)

(comment_line) @comment
(comment_line (marker_text) @comment)
