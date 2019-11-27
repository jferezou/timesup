<template>
    <div class="example-full">
        <h1 id="example-title" class="example-title">Full Example</h1>

        <v-layout row wrap align-center>
            <v-btn @click="onAddFolder">
                <v-icon left size="22">{{$vuetify.icons.concept.folder}}</v-icon>
                Upload directory
            </v-btn>
            <v-btn @click="onFilesAdded">
                <v-icon left size="22">{{$vuetify.icons.concept.documents}}</v-icon>
                Upload files
            </v-btn>
            <v-flex xs12 wrap>
                <v-data-table ref="upload-ticket-table"
                              class="elevation-1 fixed-header v-table__overflow"
                              no-data-text="Aucune donnée."
                              :headers="headers_table"
                              :items="files"
                              hide-actions>
                    <template slot="items" slot-scope="props">
                        <td>
                            <img v-if="props.item.thumb" :src="props.item.thumb" width="40" height="auto"/>
                            <span v-else>No Image</span>
                        </td>
                        <td>
                            <div class="filename">
                                {{props.item.name}}
                            </div>
                        </td>
                        <td>
                            <v-layout column justify-center align-center>{{props.item.size | formatSize}}</v-layout>
                        </td>
                        <td>
                            <v-layout column justify-center align-center>{{props.item.speed | formatSize}}</v-layout>
                        </td>
                        <td v-if="props.item.error">
                            <v-layout column justify-center align-center>
                                <v-icon size="22">{{$vuetify.icons.action.error}}</v-icon>
                                <div class="subheading font-weight-small">{{file.error}}</div>
                            </v-layout>
                        </td>
                        <td v-else-if="props.item.success">
                            <v-layout column justify-center align-center>
                                <v-icon size="22">{{$vuetify.icons.action.success}}</v-icon>
                                <div class="subheading font-weight-small">Upload terminated</div>
                            </v-layout>
                        </td>
                        <td v-else-if="props.item.active">
                            <v-layout column justify-center align-center>
                                <v-progress-circular indeterminate size="20"/>
                                <div class="subheading font-weight-small">Upload in progress ...</div>
                            </v-layout>
                        </td>
                        <td v-else></td>
                        <td>
                            <v-layout column justify-center align-center>
                                <v-icon-button-with-tool-tip v-on:buttonClick="removeFile(props.item.id)"
                                                             detail="Remove"
                                                             :icon="$vuetify.icons.action.remove"
                                                             btnIsIcon btnRound btnFlat btnSmall iconSmall tooltipBottom
                                                             btnColorClass="transparent"
                                                             iconColorClass="grey darken-1"
                                />
                            </v-layout>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <div class="upload">
            <v-btn type="button" @click.prevent="$refs.upload.active = true">
                <v-icon left size="22">{{$vuetify.icons.action.upload}}</v-icon>
                Start Upload
            </v-btn>
        </div>

        <file-upload
                class="btn btn-primary dropdown-toggle"
                :post-action="postAction"
                :put-action="putAction"
                :extensions="extensions"
                :accept="accept"
                :multiple="multiple"
                :directory="directory"
                :size="size || 0"
                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                :headers="headers"
                :data="data"
                :drop="drop"
                :drop-directory="dropDirectory"
                :add-index="addIndex"
                v-model="files"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="upload">
        </file-upload>


    </div>
</template>

<script>
    import Cropper from 'cropperjs';
    import ImageCompressor from '@xkeshi/image-compressor';
    import FileUpload from 'vue-upload-component';
    import VIconButtonWithToolTip from "@/components/VIconButtonWithToolTip.vue";
    import _ from "lodash";

    export default {
        components: {
            FileUpload,
            VIconButtonWithToolTip
        },

        data() {
            return {
                headers_table: [
                    {text: "Thumb", sortable: false, value: "thumb", align: "middle", width: "15%"},
                    {text: "Name", sortable: true, value: "name", align: "left", width: "25%"},
                    {text: "Size", sortable: false, value: "size", align: "middle", width: "15%"},
                    {text: "Speed", sortable: false, value: "speed", align: "middle", width: "15%"},
                    {text: "Status", sortable: false, value: "status", align: "middle", width: "15%"},
                    {text: "Action", sortable: false, value: "action", align: "middle", width: "15%"},
                ],
                files: [],
                accept: 'image/png,image/gif,image/jpeg,image/webp',
                extensions: 'gif,jpg,jpeg,png,webp',
                // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
                // extensions: /\.(gif|jpe?g|png|webp)$/i,
                minSize: 1024,
                size: 1024 * 1024 * 10,
                multiple: true,
                directory: false,
                drop: true,
                dropDirectory: true,
                addIndex: false,
                thread: 3,
                name: 'file',
                postAction: '/upload/post',
                putAction: '/upload/put',
                headers: {
                    'X-Csrf-Token': 'xxxx',
                },
                data: {
                    '_csrf_token': 'xxxxxx',
                },

                autoCompress: 1024 * 1024,
                uploadAuto: false,
                isOption: false,

                addData: {
                    show: false,
                    name: '',
                    type: '',
                    content: '',
                },


                editFile: {
                    show: false,
                    name: '',
                }
            }
        },

        watch: {
            'editFile.show'(newValue, oldValue) {
                if (!newValue && oldValue) {
                    this.$refs.upload.update(this.editFile.id, {error: this.editFile.error || ''})
                }

                if (newValue) {
                    this.$nextTick(function () {
                        if (!this.$refs.editImage) {
                            return
                        }
                        let cropper = new Cropper(this.$refs.editImage, {
                            autoCrop: false,
                        });
                        this.editFile = {
                            ...this.editFile,
                            cropper
                        }
                    })
                }
            },

            'addData.show'(show) {
                if (show) {
                    this.addData.name = '';
                    this.addData.type = '';
                    this.addData.content = '';
                }
            },
        },

        methods: {
            removeFile(fileId) {
                this.files = _.filter(this.files, file => file.id !== fileId);
            },
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    // Before adding a file
                    // Filter system files or hide files
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }

                    // Filter php html js file
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }

                    // Automatic compression
                    if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                        newFile.error = 'compressing';
                        const imageCompressor = new ImageCompressor(null, {
                            convertSize: Infinity,
                            maxWidth: 512,
                            maxHeight: 512,
                        });
                        imageCompressor.compress(newFile.file)
                            .then((file) => {
                                this.$refs.upload.update(newFile, {error: '', file, size: file.size, type: file.type})
                            })
                            .catch((err) => {
                                this.$refs.upload.update(newFile, {error: err.message || 'compress'})
                            })
                    }
                }


                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {

                    // Create a blob field
                    newFile.blob = '';
                    let URL = window.URL || window.webkitURL;
                    if (URL && URL.createObjectURL) {
                        newFile.blob = URL.createObjectURL(newFile.file)
                    }

                    // Thumbnails
                    newFile.thumb = '';
                    if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                        newFile.thumb = newFile.blob
                    }
                }
            },

            // add, update, remove File Event
            inputFile(newFile, oldFile) {
                if (newFile && oldFile) {
                    // update

                    if (newFile.active && !oldFile.active) {
                        // beforeSend

                        // min size
                        if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                            this.$refs.upload.update(newFile, {error: 'size'})
                        }
                    }

                    if (newFile.progress !== oldFile.progress) {
                        // progress
                    }

                    if (newFile.error && !oldFile.error) {
                        // error
                    }

                    if (newFile.success && !oldFile.success) {
                        // success
                    }
                }


                if (!newFile && oldFile) {
                    // remove
                    if (oldFile.success && oldFile.response.id) {
                        // $.ajax({
                        //   type: 'DELETE',
                        //   url: '/upload/delete?id=' + oldFile.response.id,
                        // })
                    }
                }


                // Automatically activate upload
                if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                    if (this.uploadAuto && !this.$refs.upload.active) {
                        this.$refs.upload.active = true
                    }
                }
            },

            // add folder
            onAddFolder() {
                if (!this.$refs.upload.features.directory) {
                    this.alert('Your browser does not support')
                    return
                }

                let input = this.$refs.upload.$el.querySelector('input')
                input.directory = true
                input.webkitdirectory = true
                this.directory = true

                input.onclick = null
                input.click()
                input.onclick = (e) => {
                    this.directory = false
                    input.directory = false
                    input.webkitdirectory = false
                }
            },
            onFilesAdded() {
                let input = this.$refs.upload.$el.querySelector('input')
                input.directory = false
                input.multiple = true

                input.onclick = null
                input.click()
                input.onclick = (e) => {
                    this.directory = false
                    input.directory = false
                    input.webkitdirectory = false
                }
            }

        }
    }
</script>
