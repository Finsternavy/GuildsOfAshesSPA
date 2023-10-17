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
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    limited: {
        type: Boolean,
        default: false,
    },
    viewOnly: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);
const isEditable = ref(true);

let highlightColor = ref('#ff0000');
let textColor = ref('#ffffff');
let fontChoice = ref();

let editor = new ref(null);
let nameEditor = new ref(null);

const limit = ref(20);
const fullLimit = ref(2000);

// watch(() => props.modelValue, (value) => {
//     const isSame = editor.value.getHTML() === value;

//     if (isSame) {
//         return;
//     }

//     editor.value.commands.setContent(value, false);
// });

watch(() => isEditable.value, (value) => {
    editor.value.setOptions({
        editable: value,
    });
});

onBeforeMount(() => {

    if (props.limited){
        console.log("Creating a limited editor");
        editor.value = new Editor({
        extensions: [
            StarterKit,
            FloatingMenu,
            BubbleMenu,
            TextStyle,
            Color.configure({
                types: ['textStyle', 'highlight'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            FontFamily,
            Link,
            CharacterCount.configure({
                limit: limit.value,
            }),

            ],
            content: "<p>Guild Name</p>",

            onUpdate: () => {
                let restrictedContent = editor.value.getHTML();
                restrictedContent = 
                emit('update:modelValue', editor.value.getHTML());
            },
        })
    } 
    else {
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
            Link,
            CharacterCount.configure({
                limit: fullLimit.value,
            }),

            ],
            content: props.modelValue ? props.modelValue : "<p>Enter your text here... </p>",
            onUpdate: () => {
                emit('update:modelValue', editor.value.getHTML());
            },
        });
    }
});

onMounted(() => {
    if (props.limited){
        document.getElementById('H1').click();
        document.getElementById('AlignCenter').click();
    }
    editor.value.commands.setColor("#ffffff")
    if (props.viewOnly){
        editor.value.setOptions({
            editable: false,
        });
    }
    // editor.value.getAttributes('textStyle').color = textColor.value;
;});


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
    // editor.value.chain().focus().getAttributes('textStyle').color = textColor.value;
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

const setLink = () => {
    const url = window.prompt('URL');

    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}
</script>

<style scoped>

.guild-name {
    font-size: 45px;
}
.editor {
    border-radius: 30px;
    /* background-color: rgba(255, 255, 255, 0.2); */
    /* border: 3px solid rgb(81, 0, 0); */
}

.controls {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 30px 30px 0 0;
    padding: 5px 10px;
    border-bottom: 3px solid var(--secondary-color);
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
    padding: 5px 10px!important;
    border-color: black;
    color: white;
    background-color: black;
    /* height: 34px; */
    margin-right: 3px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    /* font-weight: 500; */
}

.editor-button:hover {
    background-color: var(--background-color-alpha);
    /* background-color: rgba(255, 255, 255, 0.2); */
    color: var(--primary-color);
}

.tippy-content {
    background-color: var(--primary-color);
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

.hideBorder {
    border: none!important;
}

.border {
    border: 3px solid var(--secondary-color);
}

.fake-button {
    width: 100%;
    height: 100%;
    padding: 0;
}
</style>

<template>
    <div class="editor uk-position-relative" :class="{'border' : !props.viewOnly}">
        <!-- <div>
            <input type="checkbox" v-model="isEditable">
            Editable
        </div> -->
        <div v-if="!props.viewOnly" class="controls">
            <div class="uk-flex uk-flex-around uk-margin-bottom uk-child-width-1-1 uk-child-width-auto@m uk-margin-remove-bottom" uk-grid>
                <div class="text-controls uk-flex-column uk-flex-center uk-margin-small-top uk-margin-small-bottom">
                    <div class="uk-text-center control-header">
                        Text Style
                    </div>
                    <div class="uk-flex uk-flex-center">
                        <button class="editor-button" @click="editor.chain().focus().toggleBold().run()">
                            <span uk-icon="icon: bold"></span>
                        </button>
                        <button class="editor-button" @click="editor.chain().focus().toggleItalic().run()">
                            <span uk-icon="icon: italic"></span>
                        </button>
                        <button  id="H1" class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                            Giant
                        </button>
                        <button v-show="!props.limited" class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                            H1
                        </button>
                        <button v-show="!props.limited" class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                            H2
                        </button>
                    </div>
                </div>
                <div class="uk-flex uk-flex-column uk-flex-middle uk-margin-small-top uk-margin-small-bottom">
                    <div class="uk-width-1-1 uk-text-center control-header">
                        Text Alignment
                    </div>
                    <div class="alignment-controls uk-flex uk-flex-center">
                        <button v-show="!props.limited"  class="editor-button" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                            <span uk-icon="icon: chevron-left; ratio: 1"></span>
                        </button>
                        <button id="AlignCenter" class="editor-button" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                            <span uk-icon="icon: chevron-right; ratio: 1"></span><span uk-icon="icon: chevron-left; ratio: 1"></span>
                        </button>
                        <button v-show="!props.limited"  class="editor-button" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                            <span uk-icon="icon: chevron-right; ratio: 1"></span>
                        </button>
                        <button v-show="!props.limited"  class="editor-button" @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                            <span uk-icon="icon: chevron-left; ratio: 1"></span><span uk-icon="icon: chevron-right; ratio: 1"></span>
                        </button>
                    </div>
                </div>
                <!--  Font Family -->
                <div class="uk-flex uk-flex-column uk-flex-middle uk-margin-small-top uk-margin-small-bottom">
                    <div class="uk-width-1-1 uk-text-center control-header">
                        Font Family
                    </div>
                    <div class="font-family-options">
                        <select name="FontSelect" id="FontSelect" @change="updateFontChoice"
                        class="editor-button"
                        :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: fontChoice }) }"
                        v-model="fontChoice">
                        
                            <option class="bg-black" value="acier-bat-noir">Acier-bat-noir</option>
                            <option class="bg-black" value="antiquarian-scribe">Antiquarian-scribe</option>
                            <option class="bg-black" value="aviano-future">Aviano-future</option>
                            <option class="bg-black" value="avebury-black">Avebury-black</option>
                            <option class="bg-black" value="banshee-std">Banshee-std</option>
                            <option class="bg-black" value="battery-park">Battery-park</option>
                            <option class="bg-black" value="bd-brick">Bd-brick</option>
                            <option class="bg-black" value="broadsheet">Broadsheet</option>
                            <option class="bg-black" value="cc-spellcaster">CC-Spellcaster</option>
                            <option class="bg-black" value="charbroiled">Charbroiled</option>
                            <option class="bg-black" value="Comic Sans MS, Comic Sans">Comic Sans</option>
                            <option class="bg-black" value="cursive">Cursive</option>
                            <option class="bg-black" value="exocet">Exocet</option>
                            <option class="bg-black" value="gloridot">Gloridot</option>
                            <option class="bg-black" value="Inter">Inter</option>
                            <option class="bg-black" value="itc-avant-garde-gothic-pro">Itc-avant-garde-gothic-pro</option>
                            <option class="bg-black" value="Lugrasimo">Lugrasimo</option>
                            <option class="bg-black" value="megavolt">Megavolt</option>
                            <option class="bg-black" value="monospace">Monospace</option>
                            <option class="bg-black" value="monsterific-bb">Monsterific-bb</option>
                            <option class="bg-black" value="p22-arts-and-crafts">P22-arts-and-crafts</option>
                            <option class="bg-black" value="pf-uniform">PF-uniform</option>
                            <option class="bg-black" value="saber">Saber</option>
                            <option class="bg-black" value="Sedgwick Ave Display">Sedgwick Ave Display</option>
                            <option class="bg-black" value="sepian">Sepian</option>
                            <option class="bg-black" value="serif">Serif</option>
                            <option class="bg-black" value="shogun">Shogun</option>
                            <option class="bg-black" value="sneakers-pro">Sneakers-pro</option>
                            <option class="bg-black" value="storefront-pro">Storefront-pro</option>
                            <option class="bg-black" value="timberline">Timberline</option>
                            <option class="bg-black" value="whomp">Whomp</option>
    
                        </select>
                    </div>
                </div>
                <div v-show="!props.limited" class="media control-header uk-margin-small-top uk-margin-small-bottom uk-flex uk-flex-column uk-flex-middle">
                    <div>
                        Media
                    </div>
                    <div class="uk-flex">
                        <button class="editor-button" @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
                            <span uk-icon="icon: link"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="uk-padding-small">
            <editor-content id="Editor" :editor="editor" :class="{'hideBorder' : props.viewOnly}" />
        </div>
        <div v-if="!props.viewOnly">
            <div class="character-count uk-text-center" v-if="editor && props.limited">
                {{ editor.storage.characterCount.characters() }}/{{ limit }} characters
            </div>
            <div class="character-count uk-text-center" v-else>
                {{ editor.storage.characterCount.characters() }}/{{ fullLimit }} characters
            </div>
        </div>
        <BubbleMenu v-if="!props.viewOnly"
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
                <button @click="toggleTextColor"  class="is-active editor-button">
                    <label class="fake-button" for="textColorInput"><span class="">T</span>
                    <input
                        id="textColorInput"
                        type="color"
                        class="hide"
                        visible="false"
                        @input="editor.chain().focus().setColor($event.target.value).run()"
                        @changed="closeTextColorPicker"
                        v-model="textColor">
                    </label>
                    <!-- <button  @click="toggleTextColor" class="editor-button"></button> -->
                </button>

                <button @click="toggleHighlight" class="is-active editor-button">
                    <label class="fake-button" for="highlightInput"><span uk-icon="icon: paint-bucket; ratio: 1"></span>
                    <input
                        id="highlightInput"
                        type="color" 
                        @input="editor.chain().focus().toggleHighlight({color: $event.target.value}).run()"
                        v-model="highlightColor"
                        class="hide"
                        visible="false"
                        :class="{ 'is-active hide': editor.isActive('highlight', { color: highlightColor })}">
                    </label>
                </button>
        </BubbleMenu>
        <FloatingMenu v-if="!props.viewOnly && !props.limited"  :editor="editor" >
            <button class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                H2
            </button>
            <button class="editor-button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                H3
            </button>
            <button class="editor-button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                Bullet List
            </button>
        </FloatingMenu>
    </div>
</template>