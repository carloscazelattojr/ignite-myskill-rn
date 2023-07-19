import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
    
}

export function Home() {

    const [newSkill, setNewSkill] = useState('');
    const [mySkill, setMySkill] = useState<SkillData[]>([]);
    const [greetings, setGreetings] = useState('');

    function handleAddNewSkill() {

        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkill([...mySkill, data]);

    }

    function handleRemoveSkill(id: string){
        setMySkill(item => item.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 8 && currentHour < 12) {
            setGreetings('Bom dia!');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreetings('Boa tarde!');
        } else { setGreetings('Boa noite!') }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Bem vindo, Carlos
            </Text>

            <Text style={styles.greetings}>
                {greetings}
            </Text>

            <TextInput
                style={styles.input}
                placeholder='New Skill'
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button title='Add' onPress={handleAddNewSkill} />

            <Text style={[styles.title, { marginVertical: 30 }]}>
                My Skills
            </Text>

            <FlatList

                data={mySkill}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <SkillCard 
                        skill={item.name} 
                        onPress={() => handleRemoveSkill(item.id)}
                    />}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 20,
        borderRadius: 7
    },
    greetings: {
        color: '#fff'
    }
});