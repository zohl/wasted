{ nixpkgs ? import <nixpkgs> {} }:
nixpkgs.pkgs.callPackage ./wasted.nix { }
