<script>
  import { onMount } from "svelte";
  import Toolbar from "./components/Toolbar.svelte";
  import Aside from "./components/Aside.svelte";
  import Editor from "./components/Editor.svelte";
  import { Input, Row, Col, Styles, FormGroup, Spinner } from "sveltestrap";
	import { apiBaseUrl, postFromApi, requestInProgress, title,id } from './stores.js';
	import { remoteRequest } from './helpers.js';

  // export let testProp;
  let showSpinner = false;

  requestInProgress.subscribe(value => {
    showSpinner = value;
  });

  postFromApi.subscribe(value => {
    if(undefined === value.title){
      return;
    }
    // console.log(value);
    title.set(value.title.rendered);
  });

  
  onMount(async function () {
    // console.log($id);

    if(undefined !== $id){
      remoteRequest($apiBaseUrl + 'posts/' + $id).then(data => {
        postFromApi.set(data.json);
        // console.log(data.json);
      });
    }
  });



</script>

<Styles />

<div>

  <Row>
    <Col md="9">
      <FormGroup>
        <Input
          bind:value={$title}
          type="text"
          name="article-form-title"
          id="article-form-title"
          autocomplete="off"
          placeholder="New post title here..."
        />
      </FormGroup>

      <Toolbar />

      <Editor />
    </Col>
    <Col md="3">
      <Aside />
    </Col>
  </Row>
  {#if showSpinner}
    <Spinner color="secondary"/>
  {/if}

</div>
