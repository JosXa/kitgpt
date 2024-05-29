import { PROMPT_WIDTH } from "../settings"
import { systemPrompt } from "../store/settings"
import { KitGptScreen } from "./base/KitGptScreen"

export default class ConfigureSystemPrompt extends KitGptScreen<string | undefined> {
  name = "configure-system-prompt"

  async render(): Promise<string | undefined> {
    // biome-ignore lint/suspicious/noAsyncPromiseExecutor: Wrapped in try/catch, should be safe.
    return await new Promise(async (resolve, reject) => {
      try {
        await editor({
          hint: "Configure your system prompt",
          input: systemPrompt.value,
          width: PROMPT_WIDTH,
          onSubmit(val) {
            systemPrompt.value = val ?? ""
            resolve(val)
          },
          shortcuts: [
            {
              name: "Save",
              key: `${cmd}+s`,
              onPress: submit,
              bar: "right",
            },
            {
              name: "Cancel",
              key: `${cmd}+p`,
              onPress: () => resolve(systemPrompt.value),
              bar: "right",
            },
          ],
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
