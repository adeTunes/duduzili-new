export function displayImage(file, setter) {
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      setter(e.target.result);
    };

    reader.readAsDataURL(file);
  }
}
