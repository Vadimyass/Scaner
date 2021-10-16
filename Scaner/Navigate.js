import React from 'react';
import Main from './Main';
import FormRedactor from './FormRedactor';
import FormCreator from './FormCreator';
import MenuTables from './MenuTables';
import Schet from './Schet'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    title: 'Главная',
                    headerStyle: { backgroundColor: '#14274e', height: 75 },
                    headerTitleStyle: { fontWeight: '200', textAlign: 'center', color:'#fff' },
                }}
            />
            <Stack.Screen
                name="Redactor"
                component={FormRedactor}
                options={{
                    title: 'Редактировать профиль',
                    headerStyle: { backgroundColor: '#14274e', height: 75 },
                    headerTitleStyle: { fontWeight: '200', textAlign: 'center', marginRight: '15%', color:'#fff', fontSize: 17 },
                }}
            />
            <Stack.Screen
                name="Creator"
                component={FormCreator}
                options={{
                    title: 'Создать профиль',
                    headerStyle: { backgroundColor: '#14274e', height: 75 },
                    headerTitleStyle: { fontWeight: '200', textAlign: 'center', marginRight: '15%', color:'#fff', fontSize: 17 },
                }}
            />
            <Stack.Screen
                name="MenuTables"
                component={MenuTables}
                options={{
                    title: 'Главная',
                    headerStyle: { backgroundColor: '#14274e', height: 75 },
                    headerTitleStyle: { fontWeight: '200', textAlign: 'center', color:'#fff' },
                }}
            />
            <Stack.Screen
                name="Schet"
                component={Schet}
                options={{
                    title: 'Редактировать профиль',
                    headerStyle: { backgroundColor: '#14274e', height: 75 },
                    headerTitleStyle: { fontWeight: '200', textAlign: 'center', marginRight: '15%', color:'#fff', fontSize: 17 },
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>;
}