import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-hot-toast'; 

const TASKS_COLLECTION = 'tasks';

/**
* Suscribirse a las tareas del usuario en tiempo real
*/
export const subscribeToTasks = (userId, callback) => {
    const q = query(
        collection(db, TASKS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            dueDate: doc.data().dueDate?.toDate()
        }));
        callback(tasks);
    }, (error) => {
        console.error('Error en snapshot:', error);
        toast.error('Error de conexión con la base de datos');
    });
};

/**
* Crear una nueva tarea
*/
export const createTask = async (userId, taskData) => {
    try {
        const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
            ...taskData,
            userId,
            completed: false,
            createdAt: serverTimestamp()
        });

        toast.success('¡Tarea creada con éxito! 🚀');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error creating task:', error);
        toast.error('No se pudo crear la tarea ❌'); 
        return { success: false, error: error.message };
    }
};

/**
* Actualizar una tarea existente (incluye marcar como completada)
*/
export const updateTask = async (taskId, updates) => {
    try {
        const taskRef = doc(db, TASKS_COLLECTION, taskId);
        await updateDoc(taskRef, updates);
        
        toast.success('Tarea actualizada correctamente ✨'); 
        return { success: true };
    } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Error al actualizar la tarea');
        return { success: false, error: error.message };
    }
};

/**
* Eliminar una tarea
*/
export const deleteTask = async (taskId) => {
    try {
        await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
        
        toast.success('Tarea eliminada 🗑️'); 
        return { success: true };
    } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('No se pudo eliminar la tarea'); 
        return { success: false, error: error.message };
    }
};

/**
* Obtener una tarea específica por ID (aquí no suele ser necesario toast)
*/
export const getTaskById = async (taskId) => {
    try {
        const taskDoc = await getDoc(doc(db, TASKS_COLLECTION, taskId));
        if (taskDoc.exists()) {
            return {
                success: true,
                task: {
                    id: taskDoc.id,
                    ...taskDoc.data(),
                    createdAt: taskDoc.data().createdAt?.toDate(),
                    dueDate: taskDoc.data().dueDate?.toDate()
                }
            };
        } else {
            return { success: false, error: 'Tarea no encontrada' };
        }
    } catch (error) {
        console.error('Error getting task:', error);
        return { success: false, error: error.message };
    }
};