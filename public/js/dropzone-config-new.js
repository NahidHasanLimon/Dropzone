// Dropzone.options.fileUpload = {
//     autoProcessQueue: false,
//    url:"/images-save-new",
//     addRemoveLinks: true,
//     // accept: function(file) {
//     //     let fileReader = new FileReader();

//     //     fileReader.readAsDataURL(file);
//     //     fileReader.onloadend = function() {

//     //         let content = fileReader.result;
//     //         $('#file').val(content);
//     //         file.previewElement.classList.add("dz-success");
//     //     }
//     //     file.previewElement.classList.add("dz-complete");
//     // }
// }

//  $(document).on('click','#new_upload_submit_button',function(e){
//                                 e.preventDefault();
// // fileUpload.processQueue();
//                                        $.ajax({
//                                           // url:"{{route('image-save-new')}}",
//                                         url:"/images-save-new",
//                                           method:"POST",
//                                         data:new FormData(new_upload_form),
//                                        dataType:'JSON',
//                                         contentType: false,
//                                         cache: false,
//                                         processData: false,
//                                           success:function(data)
//                                           {
//                                                    console.log(data);                                            
//                                           }
                                          
//                                       });
//                                        // end of ajax
                                   
//                         }); 


        Dropzone.options.fileUpload = {

             url:"/images-save-new",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            acceptedFiles: "image/*",
            headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    // headers: {
    //     'X-CSRFToken': '{{ csrf_token() }}'
    // },


            init: function () {
                var submitButton = document.querySelector("#new_upload_submit_button");
                var wrapperThis = this;
                submitButton.addEventListener("click", function (e) {
                    e.preventDefault();
                    wrapperThis.processQueue();
                });
                this.on("addedfile", function (file) {

                    // Create the remove button
                    var removeButton = Dropzone.createElement("<button class='btn btn-lg dark'>Remove File</button>");

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
            }
        };
