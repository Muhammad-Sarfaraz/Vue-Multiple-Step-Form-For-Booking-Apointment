<template>
    <div v-if="img" class="img-drop-preview">
        <img v-if="!type || type == 'image'" :src="img" alt="">
        <p v-else style="height: 200px; text-align: center; line-height: 200px">{{name || 'file(s) selected'}}</p>
        <div class="img-drop-preview__remove">
            <i class="bi bi-trash"  @click="removeImg"></i>
        </div>
    </div>
    <label
     v-else
     @dragenter="handleDragEnter"
     @dragleave="handleDragLeave"
     @dragover="handleDragOver"
     @drop="handleDrop"
     class="img-drop-zone"
     for="customImg"
     ref="dropZone"
    >
        <i class="bi bi-cloud-arrow-up"></i>
        <span>Drag and drop files here or browse</span>
        <input @change="handleChange" type="file" name="customImg" id="customImg">
    </label>
</template>

<script>
export default {
    props: ['defaultImg', 'oldImage', 'type'],
    data(){
        let img = this.oldImage ? this.oldImage : this.defaultImg 
        return {
            img,
            name: ''
        }
    },
    methods: {
        handleDragEnter(e){
            e.preventDefault()
            e.stopPropagation()
        },
        handleDragLeave(e){
            e.preventDefault()
            e.stopPropagation()
        },
        handleDragOver(e){
            e.preventDefault()
            e.stopPropagation()
        },
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            if(!e.dataTransfer.files.length) return
            this.handeImg(e.dataTransfer.files[0])
        },
        handleChange(e){
            if(!e.target.files.length) return
            this.handeImg(e.target.files[0])
        },
        handeImg(file){
            this.name = ''
            //check if file is an image
            if(file.type.indexOf((this.type || 'image')) === -1) return alert(`Invalid file type only ${this.type || 'image'}s are allowed`)
            //check if file is less than 5kb
            if(file.size < 5000) return alert('Please upload an image larger than 5kb')
            //check if file is greater than 5mb
            if(file.size > 5000000) return alert('Please upload an image less than 5mb')

            //create a new file reader and get base64 data
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.img = reader.result
                this.name = file.name
                this.$emit('result', reader.result)
            }
        },
        removeImg(){
            this.img = ""
            this.$emit('result', '')
        }
    }
}
</script>

<style scoped>
.img-drop-zone{
    border: 2px dashed var(--primary-color);
    border-radius: 5px;
    padding: 2em 1.5em;
    text-align: center;
    cursor: pointer;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
}
.img-drop-zone i{
    font-size: 3em;
    color: var(--primary-color);
}
.img-drop-zone input{
    display: none;
}
.img-drop-preview{
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position: relative;
}
.img-drop-preview img{
    display: block;
    max-width: 100%;
    height: auto;
}
.img-drop-preview__remove{
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0,0,0,0.16);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    display: none;
}
.img-drop-preview:hover .img-drop-preview__remove{
    display: flex;
}
.img-drop-preview__remove i{
    cursor: pointer;
    color: rgb(233, 6, 6);
}
</style>