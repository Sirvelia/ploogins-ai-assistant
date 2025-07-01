declare global {
    interface Window {
        wp?: {
            updates: {
                ajax: (action: string, args: {
                    slug: string;
                    name?: string;
                    success?: (response: {
                        slug: string;
                        plugin: string;
                        pluginName: string;
                        newVersion: string;
                    }) => void;
                    error?: (response: {
                        slug: string;
                        plugin?: string;
                        pluginName?: string;
                        errorCode: string;
                        errorMessage: string;
                    }) => void;
                }) => void;
            };
        };
    }
}

export { };