
function format(literals, ...substitutions) {
    let result = '';

    for (let i = 0; i < substitutions.length; i++) {
        result += literals[i];
        result += substitutions[i];
    }
    // add the last literal
    result += literals[literals.length - 1];
    return result;
}

const css = format 
const html = format 

const cssText = css`
.page-bg {
    display: inline-block;
    --dot-color: rgb(150, 150, 150);
    background: radial-gradient(circle, var(--dot-color), transparent 2px);
    background-size: 22px 22px;
    background-position: -10px -10px;
    background-repeat: repeat;
    padding: 0 20px;
    min-height: 100%;
    min-width: 100%;
    box-sizing: border-box;
  }
`

const htmlContent = html`
<style>
    ${cssText}
</style>
<span class="page-bg"><slot></slot></span>
`

class HomepageSection extends HTMLDivElement {
    constructor(){
        super();
        const shadowDom = this.attachShadow({mode: "open"});
        shadowDom.innerHTML = htmlContent
    }
}

customElements.define('home-page-section', HomepageSection, {extends: 'div'})