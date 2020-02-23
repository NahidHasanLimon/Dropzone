
 Dropzone.options.fileUpload = {
             url:"/images-save-new",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            acceptedFiles: "image/*",
            // addRemoveLinks: true,
             // previewTemplate: "<div></div>",
            headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
             init: function () {
  var wrapperThis = this;
 // var deleteBntDropzone = Dropzone.createElement("<button class='btn btn-lg dark m-1'>Delete</button>");

 $.getJSON('/preload-image', function(data) { // get the json response

            $.each(data, function(key,value){ //loop through it
       var deleteBntDropzone = Dropzone.createElement("<button class='btn btn-sm dark m-1 deleteBntDropzone' data-image_name="+value.name+" >Delete</button>");
                var mockFile = { name: value.name, size: value.size }; // here we get the file name and size as response 
                wrapperThis.options.addedfile.call(wrapperThis, mockFile);
                wrapperThis.options.thumbnail.call(wrapperThis, mockFile, "/images/"+value.name);//uploadsfolder is the folder where you have all those uploaded files
                // mockFile.previewElement.append(deleteBntDropzone);
                 mockFile.previewElement.appendChild(deleteBntDropzone);
                  // wrapperThis.emit('complete', mockFile)
                 // mockFile.previewElement.addRemoveLinks(true);
                mockFile.previewElement.classList.add('dz-success');
                mockFile.previewElement.classList.add('dz-complete');
                    console.log(mockFile.name);
                    console.log(mockFile.size);
                    console.log(mockFile.id);
                
            });

        });
 // end of loop
 

    //start  for new addedd images
                var submitButton = document.querySelector("#new_upload_submit_button");

                submitButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    wrapperThis.processQueue();
                });

                this.on("addedfile", function (file) {
                      var removeButton = Dropzone.createElement("<button class='btn btn-lg dark m-1'>Remove File</button>");
                    // Create the remove button
                   
                    // Listen to the click event
                    removeButton.addEventListener("click", function (e) {
                        // Make sure the button click doesn't submit the form:
                        e.preventDefault();
                        e.stopPropagation();
                        // Remove the file preview.
                        wrapperThis.removeFile(file);
                        // If you want to the delete the file on the server as well,
                        // you can do the AJAX request here.
                    });
                   
                    // Add the button to the file preview element.
                    file.previewElement.appendChild(removeButton);
                });

                this.on('sendingmultiple', function (data, xhr, formData) {
                    formData.append("name", $("#name").val());
                });
 
                 $(document).on('click','#cancelButton',function(e){
                        alert("Are you sure to remove all form list ??") ;
                        wrapperThis.removeAllFiles(true);
                        });  
                   // End of for new addedd images

                      this.on('successmultiple', function () {
                     $('.dz-preview').remove()
                     $.ajax({
                         url: '/preload-image',
                         type: 'get',
                         dataType: 'json',
                         cache: false,
                         success: function (response) {
                             $.each(response, function (key, value) {
                                 var deleteBntDropzone = Dropzone.createElement("<button class='btn btn-sm dark m-1 deleteBntDropzone data-image_name="+value.name+"' >Delete</button>");
                                 var mockFile = {name: value.name, size: value.size}
                                wrapperThis.options.addedfile.call(wrapperThis, mockFile);
                                 // wrapperThis.emit('addedfile', mockFile)
                                 mockFile.previewElement.appendChild(deleteBntDropzone);
                                 wrapperThis.emit('thumbnail', mockFile, "/images/"+value.name)
                                 wrapperThis.emit('complete', mockFile)
            // 
                             });
                         },
                         error: function(response){
                             alert('problem z json');
                         }
                     });
                 })
                    this.on("thumbnail", function (file, dataUrl) {
                     $('.dz-image').last().find('img').attr({width: '100%', height: '100%'});
                 })  

            }
            // end of init
        };
        // end of dropzone
  $(document).on('click','.deleteBntDropzone',function(e){
    e.preventDefault();
                                e.preventDefault();
                                 var name = $(this).data('image_name');
                                      if(confirm("are you sure to delete ?")){
                                       $.ajax({
                                          url: '/images-delete-preload',
                                          method:"POST",
                                           data: { id: name },
                                        dataType:'JSON',
                                         headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
                        
                                          success:function(data)
                                          {
                                             alert();
                                          }
                                          
                                      });
                                  }
                        });