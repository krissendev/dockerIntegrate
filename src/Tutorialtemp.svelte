<script>
    let a=0;
    let b=0;

</script>
<div class="container">
    <h2>Calculator</h2>
    <input type="number" bind:value={a}>
    <input type="number" bind:value={b}>
    <h4>{a+b}</h4>
</div>

<style>
    .container{
        background-color: red;
    }
</style>