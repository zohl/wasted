{ pkgs, stdenv, ... }:
let
  version = "0.0.1";
  buildDir = "../build";

in stdenv.mkDerivation {
  name = "firefox-wasted-${version}";

  buildInputs = (with pkgs; [ zip ])
             ++ (with pkgs.nodePackages; [
                  typescript
                  rollup
                  less
                ]);

  src = ./src;

  buildPhases = [ "buildPhase" "installPhase" ];

  buildPhase = ''
    rm -rf "${buildDir}"
    mkdir -p "${buildDir}"

    # for f in $(find . -name '*.less'); do
    #   lessc "$f" "${buildDir}/$(basename ''${f/%.less/.css})"
    # done

    for f in $(find . -iname '*.ts'); do
      tsc --noImplicitAny     \
          --noImplicitReturns \
          --noEmitOnError     \
          --target ES6        \
          "$f"
    done;

    cp ./manifest.json "${buildDir}"

    cp ./options/index.html "${buildDir}/options.html"
    lessc "./options/style.less" "${buildDir}/options.css"
    rollup "./options/_init.js" > "${buildDir}/options.js"

    # pushd ${buildDir}
    # zip -r ../wasted.xpi *
    # popd
  '';

  installPhase = ''
    mkdir -p $out
    cp -r "${buildDir}/"* "$out/"
    # cp wasted.xpi $out
  '';
}


