import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import DetailsScreen from '../views/DetailsScreen';


const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pokédex' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes' }} />
        </Stack.Navigator>
    </NavigationContainer>
);


export default AppNavigator;


