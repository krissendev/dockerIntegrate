<script>
        import {langdataContact }           from '$store/store.js';
</script>
<div class="pageSection contactSvelte">
    <br>
    <h3 id="contact">This is Contact</h3>    
    <p>{$langdataContact}</p>
    <form>
        <input type="text" placeholder="name" required>
        <input type="text"placeholder="email" required>
        <textarea type="text" required></textarea>
        <button>Send</button>
    </form>
</div>
