$(document).ready(function() {
  $("#audioInputSelect").empty();
  $("#videoInputSelect").empty();
  $("#audioOutputSelect").empty();
  Owt.Base.MediaStreamFactory.getAvailableDevices().then(function(devices){
    devices.forEach(function(device) {
      if (device.kind === 'audioinput') {
        $('#audioInputSelect').append($('<option>', {
          value: device.deviceId,
          text: device.label
        }));
      } else if (device.kind === 'audiooutput') {
        $('#audioOutputSelect').append($('<option>', {
          value: device.deviceId,
          text: device.label
        }));
      } else if (device.kind === 'videoinput') {
        $('#videoInputSelect').append($('<option>', {
          value: device.deviceId,
          text: device.label
        }));
      } else {
        console.log('Some other kind of source/device: ', device);
      }
    });

    if (localStorage.hasOwnProperty('selectedaudioinput')) {
      $("#audioInputSelect").val(localStorage.getItem('selectedaudioinput'));
    };
  
    if (localStorage.hasOwnProperty('selectedaudiooutput')) {
      $("#audioOutputSelect").val(localStorage.getItem('selectedaudiooutput'));
    };
  
    if (localStorage.hasOwnProperty('selectedvideoinput')) {
      $("#videoInputSelect").val(localStorage.getItem('selectedvideoinput'));
    };
  });  
});

$('button#saveDeviceSettings').click(function() {
  const selectedAudioInput = $('.modal-body #audioInputSelect').val();
  const selectedAudioOutput = $('.modal-body #audioOutputSelect').val();
  const selectedVideoInput = $('.modal-body #videoInputSelect').val();

  localStorage.clear();
  localStorage.setItem("selectedaudioinput", selectedAudioInput);
  localStorage.setItem("selectedaudiooutput", selectedAudioOutput);
  localStorage.setItem("selectedvideoinput", selectedVideoInput);
  
  $("#myModal").modal("hide");  
});

$('button#clearDeviceSettings').click(function() {
  localStorage.clear();
  $("#myModal").modal("hide");  
});