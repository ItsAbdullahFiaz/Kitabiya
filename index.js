/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { AppDataProvider } from './src/context';

const MainApp = () => (
    <AppDataProvider>
        <App />
    </AppDataProvider>
);

AppRegistry.registerComponent(appName, () => MainApp);
