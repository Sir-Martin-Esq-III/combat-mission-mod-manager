#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

use std::fs;

// the payload type must implement `Serialize`.
// for global events, it also must implement `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[tauri::command]
fn fetch_files_in_folder(folder_path: String) -> String {
    let mut modsList: Vec<String> = vec![];
    let paths = fs::read_dir(folder_path).unwrap();
    for path in paths {
        let tmp = path.unwrap().path();
        let currentPath: Vec<&str> = tmp.to_str().unwrap().split('/').collect();
        modsList.push(currentPath[currentPath.len() - 1].to_string());
    }
    let serialised_list = serde_json::to_string(&modsList).unwrap();
    serialised_list.into()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fetch_files_in_folder])
        .setup(|app| {
            // listen to the `event-name` (emitted on any window)
            let id = app.listen_global("ping", |event| {
                let modList: Vec<String> = vec![];

                println!("got event-name with payload {:?}", event.payload());
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
