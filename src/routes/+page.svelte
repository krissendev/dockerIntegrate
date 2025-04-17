<script>
    import Page                             from '$pages/+page.svelte'
    let { data,form } = $props();
</script>
<!-- <h1>SLUG {data.title}, {data.path}, {data.lang} </h1>
<div>{@html data.content}</div> -->
<Page data={data} form={form}/>