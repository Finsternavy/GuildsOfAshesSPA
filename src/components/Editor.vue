<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount, watch, ref, computed } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent  } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3';
import { FloatingMenu } from '@tiptap/vue-3';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'

const props = defineProps({
modelValue: {
    type: String,
    default: '',
},
});

const emit = defineEmits(['update:modelValue']);
const isEditable = ref(true);

let highlightColor = ref('#ff0000');
let textColor = ref('#ffffff');
let fontChoice = ref();

let editor = new ref(null);

watch(() => props.modelValue, (value) => {
    const isSame = editor.value.getHTML() === value;

    if (isSame) {
        return;
    }

    editor.value.commands.setContent(value, false);
});

watch(() => isEditable.value, (value) => {
    editor.value.setOptions({
        editable: value,
    });
});

onBeforeMount(() => {
    editor.value = new Editor({
        extensions: [
            StarterKit,
            FloatingMenu,
            BubbleMenu,
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            FontFamily,

        ],
        content: "<p>Hello World</p>",
        onUpdate: () => {
            emit('update:modelValue', editor.value.getHTML());
        },
    });
});


onBeforeUnmount(() => {
    editor.value.destroy();
});


const toggleHighlight = () => {
    // open a color picker and set highlightColor to the selected color
    let doc =  document.getElementById('highlightInput').click();
    // if the color is already active, set highlightColor to transparent
    // if (editor.value.getAttributes('highlight').color === highlightColor.value) {
    //     editor.value.chain().focus().toggleHighlight({color: 'transparent'}).run();
    // } else {
        editor.value.chain().focus().toggleHighlight({color: highlightColor.value}).run();
    // }
};

const toggleTextColor = () => {
    // open a color picker and set highlightColor to the selected color
    let doc = document.getElementById('textColorInput').click();
    editor.value.chain().focus().getAttributes('textStyle').color = textColor.value;
    
    // change focus to the bold button
    document.getElementById('textColorInput').dispatchEvent(pressEnter);
};

const closeTextColorPicker = () => {
    // change focus to the editor

}

watch(() => highlightColor.value, (value) => {
    console.log("Highlight color changed");
    // editor.value.chain().focus().setHighl({color: value}).run();
});

const updateFontChoice = () => {
    editor.value.chain().focus().setFontFamily(fontChoice.value).run();
    fontChoice.value = null;
}

const pressEnter = new KeyboardEvent('keydown', {
  key: 'Enter',
  code: 'Enter',
  which: 13,
  keyCode: 13,
});
</script>

<style scoped>
.editor {
    border-radius: 30px;
    /* background-color: rgba(255, 255, 255, 0.2); */
    border: 3px solid black;
}

.controls {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 30px 30px 0 0;
    padding: 5px 10px;
}


.italic {
    font-style: italic;
}
.underline {
    text-decoration: underline;
    height: 100%;
    width: 100%;
}

.strike {
    text-decoration: line-through;
}
.subset {
    vertical-align: sub;
}
.superset {
    vertical-align: super;
}
.editor-button {
    border: none;
    border: 1px solid rgba(255, 255, 255, 0.2)!important;
    border-radius: 10px;
    /* background-color: rgba(255, 255, 255, 0.2); */
    padding: 5px 15px!important;
    border-color: black;
    color: white;
    background-color: black;
    height: 34px;
    margin-right: 3px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    /* font-weight: 500; */
}

.editor-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: red;
}

.tippy-content {
    background-color: red;
}

.hide {
    width: 0;
    height: 0;
}

.text-white {
    color: white;
}

.text-color-button {
    color: v-bind('textColor')!important;
    font-weight: 700;
}

.control-header {
    color: white;
    font-weight: 500;
}

.bg-black {
    background-color: black;
    color: white;
}

</style>

<template>
    <div class="editor uk-position-relative">
        <!-- <div>
            <input type="checkbox" v-model="isEditable">
            Editable
        </div> -->
        <div class="controls uk-flex uk-flex-between uk-margin-bottom">
            <div class="text-controls uk-flex-column uk-margin-right">
                <div class="uk-text-center control-header">
                    Text Style
                </div>
                <div>
                    <button class="editor-button" @click="editor.chain().focus().toggleBold().run()">B</button>
                    <button class="editor-button" @click="editor.chain().focus().toggleItalic().run()"><span class="italic">I</span></button>
                    <button class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                        H1
                    </button>
                    <button class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                        H2
                    </button>
                </div>
            </div>
            <div class="uk-flex uk-flex-column uk-margin-right">
                <div class="uk-width-1-1 uk-text-center control-header">
                    Text Alignment
                </div>
                <div class="alignment-controls">
                    <button class="editor-button" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                        <span uk-icon="icon: chevron-left; ratio: 1"></span>
                    </button>
                    <button class="editor-button" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                        <span uk-icon="icon: chevron-right; ratio: 1"></span><span uk-icon="icon: chevron-left; ratio: 1"></span>
                    </button>
                    <button class="editor-button" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                        <span uk-icon="icon: chevron-right; ratio: 1"></span>
                    </button>
                    <button class="editor-button" @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                        <span uk-icon="icon: chevron-left; ratio: 1"></span><span uk-icon="icon: chevron-right; ratio: 1"></span>
                    </button>
                </div>
            </div>
            <!--  Font Family -->
            <div>
                <div class="uk-width-1-1 uk-text-center control-header">
                    Font Family
                </div>
                <div class="font-family-options">
                    <select name="FontSelect" id="FontSelect" @change="updateFontChoice"
                    class="editor-button"
                    :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: fontChoice }) }"
                    v-model="fontChoice">
                        <option class="bg-black" value="Comic Sans MS, Comic Sans">Comic Sans</option>
                        <option class="bg-black" value="cursive">Cursive</option>
                        <option class="bg-black" value="Inter">Inter</option>
                        <option class="bg-black" value="Lugrasimo">Lugrasimo</option>
                        <option class="bg-black" value="monospace">Monospace</option>
                        <option class="bg-black" value="Sedgwick Ave Display">Sedgwick Ave Display</option>
                        <option class="bg-black" value="serif">Serif</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="uk-padding-small">
            <editor-content id="Editor" :editor="editor" />
        </div>
        <BubbleMenu
            :editor="editor">
                <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active editor-button': editor.isActive('bold') }">
                    bold
                </button>
                <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active editor-button': editor.isActive('italic') }">
                    italic
                </button>
                <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active editor-button': editor.isActive('strike') }">
                    strike
                </button>
                <!-- Text Color -->
                <div>
                    <input
                        id="textColorInput"
                        type="color"
                        class="hide"
                        @input="editor.chain().focus().setColor($event.target.value).run().then(() => closeTextColorPicker())"
                        @changed="closeTextColorPicker"
                        v-model="textColor">
                    <button  @click="toggleTextColor" class="editor-button"><span class="text-color-button">T</span></button>
                </div>

                <div class="uk-position-relative">
                    <input
                    id="highlightInput"
                    type="color" 
                    @input="editor.chain().focus().toggleHighlight({color: $event.target.value}).run()"
                    v-model="highlightColor"
                    class="hide"
                    :class="{ 'is-active hide': editor.isActive('highlight', { color: highlightColor })}">
    
                    <button
                        @click="toggleHighlight"
                        class="editor-button"
                        >
                        <span uk-icon="icon: paint-bucket; ratio: 1"></span>
                    </button>
                </div>
        </BubbleMenu>
        <FloatingMenu  :editor="editor" >
            <button class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                H1
            </button>
            <button class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                H2
            </button>
            <button class="editor-button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                Bullet List
            </button>
        </FloatingMenu>
    </div>
</template>