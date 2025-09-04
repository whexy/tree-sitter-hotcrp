// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterHotcrp",
    products: [
        .library(name: "TreeSitterHotcrp", targets: ["TreeSitterHotcrp"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterHotcrp",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterHotcrpTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterHotcrp",
            ],
            path: "bindings/swift/TreeSitterHotcrpTests"
        )
    ],
    cLanguageStandard: .c11
)
