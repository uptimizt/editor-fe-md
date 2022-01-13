<script>
  import {
    Input,
    Button,
    ButtonGroup,
    FormText,
    Icon,
    Label,
    FormGroup,
  } from "sveltestrap";

  import PreviewModal from "./PreviewModal.svelte";
  import StatusSwitch from "./StatusSwitch.svelte";
  import SaveButton from "./SaveButton.svelte";
  import NewButton from "./NewButton.svelte";
  import FileCover from "./FileCover.svelte";


</script>

<FormGroup>
  <FileCover/>
</FormGroup>

<FormGroup>
    <PreviewModal />
</FormGroup>
<FormGroup>
    <SaveButton/>
</FormGroup>

<FormGroup>
  <StatusSwitch/>
</FormGroup>

<details>
  <summary>
    Additionally
  </summary>
  <NewButton/>
  
</details>