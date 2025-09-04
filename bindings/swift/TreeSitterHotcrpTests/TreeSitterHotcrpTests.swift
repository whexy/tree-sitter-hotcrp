import XCTest
import SwiftTreeSitter
import TreeSitterHotcrp

final class TreeSitterHotcrpTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_hotcrp())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Hotcrp grammar")
    }
}
