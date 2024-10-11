<script>
    import { onMount } from 'svelte';


    //Language loader, fetch based json injection
    let languageKey = "en";
    onMount(async()=>{
        getLanguageData(languageKey)
    })

    async function getLanguageData(languageKey){
        try{
                const response = await fetch('/api/language',{
                    method:'GET',
                    headers:{'languagetag':languageKey, 'Content-Type':'application/json'}
                })
                const languageData = await response.json();
                if(languageData){
                    console.log("data;", languageData)
                    languageParser(languageData);
                }
                else if(!response.ok){console.log(`Fetch failed with status: ${response.status}`)}
            }
            catch(err){console.log("trycatch Error;", err.message)}
            finally{console.log("finally")}
    }


    async function languageParser(languageData){               
        //languageData
        const languageProperties = Object.keys(languageData)
        const languageLength = languageProperties.length;

        const elements = document.body.querySelectorAll('*'); //Get all DOM Id's
        elements.forEach((element)=>{
            if(element.id){
                //Object Iteration over languageData, if JSON ID match html ID update innerHTHML
                for(let dataIndex=0; dataIndex<languageLength; dataIndex++){
                    if(element.id === languageProperties[dataIndex]){
                        element.innerHTML = languageData[languageProperties[dataIndex]]
                    }
                }
            }          
        })
    }



    
</script>

<h1>test</h1>
<h2 id="element1"></h2>
<h2 id="element2"></h2>

<!-- {#if languageData}
    <h1>{JSON.stringify(languageData)}</h1>
{/if} -->
