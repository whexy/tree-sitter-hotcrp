package tree_sitter_hotcrp_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_hotcrp "github.com/tree-sitter/tree-sitter-hotcrp/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_hotcrp.Language())
	if language == nil {
		t.Errorf("Error loading Hotcrp grammar")
	}
}
