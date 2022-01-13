import { readable, writable, derived } from 'svelte/store';
import {marked} from 'marked';


export const requestInProgress = writable(false);

export const apiBaseUrl = readable('', function start(set) {
	const url = APP_API_URL;

	set(url);
	return function stop() {
		set(undefined);
	};
});


export const id = writable(undefined, function start(set) {
	let searchParams = new URLSearchParams(window.location.search);
	if(searchParams.get('id') > 0){
		set(searchParams.get('id'));
	}
});

export const restApiParams = readable({}, function start(set) {
	if(typeof editorFeMdApi !== 'undefined'){ 
		set(editorFeMdApi);
	} else {
		set({
			root: APP_REST_URL,
			page: '/',
		});
	}
});

export const nonceKey = readable(undefined, function start(set) {

	if(typeof editorFeMdApi !== 'undefined'){ 
		set(editorFeMdApi.nonce);
		console.log('editorFeMdApi', editorFeMdApi);
	} else {
		set(undefined);
	}
});


export const appPass = readable(undefined, function start(set) {
    const username = ENV_APP_USER_NAME;
    const pass = ENV_APP_PASS;
	const base64hash = btoa(username + ":" + pass);

	set("Basic " + base64hash);

	return function stop() {
		set(undefined);
	};
});


export const postFromApi = writable({});
export const title = writable('');
export const md_editor_content = writable('');
export const fileCover = writable(undefined);
export const content = derived(md_editor_content, ($md_editor_content, set) => {
	let cont = marked($md_editor_content);
	set(cont);
  });

export const status = writable('draft'); //or publish

export const postUpdate = derived([id, title, status, content, md_editor_content], ([$id, $title, $status, $content, $md_editor_content], set) => {
	
	let data = {
		// id: $id,
		title: $title,
		content: $content,
		// excerpt: '',
		md_editor_content: $md_editor_content,
		status: $status,
		categories: [88],
		// tags: '',
		md_editor_enable: true,
	};
	// console.log(data);
	set(data);
});
