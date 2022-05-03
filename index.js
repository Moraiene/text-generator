        async function textGeneratorGetData(text) {
            const request = await fetch("https://cofr.host/tools/morph-random", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: text})
            });

            return JSON.parse(await request.text()).result;
        }


        async function textGeneratorAction(editor) {
            const selection = editor.selection.getContent({format: "text"});
            const text = editor.getContent({format: "text"});

            if (selection) {
                editor.selection.setContent(await textGeneratorGetData(selection));
                editor.notificationManager.open({text: "Текст сгенерирован", type: "success"});
            } else if (text) {
                editor.setContent(await textGeneratorGetData(text));
                editor.notificationManager.open({text: "Успешно", type: "success"});
            } else {
                editor.notificationManager.open({text: "Текст отсутствует", type: "error"});
            }
        }

        function textGenerator(editor) {
            editor.ui.registry.addButton('textgenerator', {
                text: "Сгенерировать текст",
                onAction: function () {
                    textGeneratorAction(editor)
                }
            });
        }

        tinymce.PluginManager.add('textgenerator', function (editor) {
            textGenerator(editor);
        });
