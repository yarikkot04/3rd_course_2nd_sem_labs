#include <iostream>
#include <chrono>
#include <omp.h>
int fillScalar();
int *fillVector(int N);
int **fillMatrix(int N);
int findMinInVector(int *vector, int N);
int **getSubMatrix(int **matrix, int partOfMtrx);
int **multiplyMatrix(int **first_matrix, int **second_matrix);
int *multiplyVectorAndMatrix(int *vector, int **matrix);
int *multiplyScalarAndVector(int scalar, int *vector);
int *addVectors(int *first_vector, int *second_vector);
void combineVector(const int *vector, int *result, int partOfVctr);
void calculateStep3(int **MV, int **MM, int **MC, int *Z, int *B, int *X, int a, int e, int *A, int tId);
void printFinalVectorA(int *vector, int N);
void clearMemory();
const int N = 16;
const int P = 4;
const int H = N / P;
int a = INT_MAX;
int e;
int *A;
int *B;
int *X;
int *Z;
int **MV;
int **MM;
int **MC;
int main()
{
    auto start_time = std::chrono::high_resolution_clock::now();
    int a_i;
    int e_i;
    int tId;
    omp_set_num_threads(P);
    #pragma omp parallel num_threads(P) private(tId, a_i, e_i) shared(a, e, B, Z, MC, MM, MV)
    {
        tId = omp_get_thread_num() + 1;
        #pragma omp critical
        {
            std::cout << "Thread_" << tId << " " << "is started" << std::endl;
        }
        switch (tId)
        {
        case 1: // задача T1
            // Введення MV, MC
            MV = fillMatrix(N);
            MC = fillMatrix(N);
            break;
        case 2: // задача T2
            // Введення e, MM
            e = fillScalar();
            MM = fillMatrix(N);
            break;
        case 3: // задача T3
            // Введення A, Z
            A = fillVector(N);
            Z = fillVector(N);
            break;
        case 4: // задача T4
            // Введення B, X
            B = fillVector(N);
            X = fillVector(N);
            break;
        }
        // Бар'єр для синхронізації введення
        #pragma omp barrier
        // Обчислення 1: ai = min(Zh)
        a_i = findMinInVector(Z, N); // В методі знаходиться конструкція #pragma for
        // КД1. Обчислення 2: a = min(a, ai)
        #pragma omp critical(CS)
        {
            if (a_i < a)
            {
                a = a_i;
            }
        }
        // Бар'єр для синхронізації обчислення 2
        #pragma omp barrier
        // КД2. Копія ei = e
        #pragma omp critical(CS)
        {
            e_i = e;
        }
        // КД3. Копія аi = а
        #pragma omp critical(CS)
        {
            a_i = a;
        }
        // Обчислення 3: Aн = аi * (B * MVн) + ei * X * (MM * MCн)
        calculateStep3(MV, MM, MC, Z, B, X, a, e, A, tId);
        // Бар'єр для синхронізації виведення
        #pragma omp barrier
        if (tId == 3)
        {
        #pragma omp critical
            {
                // Виведення фінального результату А в задачі Т3
                std::cout << "A: [ ";
                printFinalVectorA(A, N);
                std::cout << "]" << std::endl;
            }
        }
        #pragma omp critical
        {
            std::cout << "Thread_" << tId << " " << "is finished" << std::endl;
        }
    }
    auto end_time = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time);
    std::cout << "Time: " << duration.count() << " ms" << std::endl;
    clearMemory();
    return 0;
}
// Метод для заповнення скаляру
int fillScalar()
{
    return 1;
}
// Метод для заповнення вектора
int *fillVector(int N)
{
    int *res = new int[N];
    for (int i = 0; i < N; i++)
    {
        res[i] = 1;
    }
    return res;
}
// Метод для заповнення матриці
int **fillMatrix(int N)
{
    int **res = new int *[N];
    for (int i = 0; i < N; i++)
    {
        res[i] = new int[N];
        for (int j = 0; j < N; j++)
        {
            res[i][j] = 1;
        }
    }
    return res;
}
// Метод для виведення фільного результату
void printFinalVectorA(int *vector, int N)
{
    for (int i = 0; i < N; ++i)
    {
        std::cout << vector[i] << " ";
    }
}
// Метод для знаходження мінімуму вектора. Кострукція #pragma for
int findMinInVector(int *vector, int N)
{
    int min = vector[0];
#pragma omp parallel for
    for (int i = 0; i < N; i++)
    {
        if (min > vector[i])
        {
            min = vector[i];
        }
    }
    return min;
}
// Метод для отримання підматриці
int **getSubMatrix(int **matrix, int partOfMtrx)
{
    int **res = new int *[N];
    for (int i = 0; i < N; i++)
    {
        res[i] = new int[H];
    }
    int startPos = (partOfMtrx - 1) * H;
    int endPos = startPos + H;
    for (int j = startPos; j < endPos; ++j)
    {
        for (int i = 0; i < N; ++i)
        {
            res[i][j - startPos] = matrix[i][j];
        }
    }
    return res;
}
// Метод для множення матриць
int **multiplyMatrix(int **first_matrix, int **second_matrix)
{
    int **res = new int *[N];
    for (int i = 0; i < N; i++)
    {
        res[i] = new int[N];
    }
    for (int i = 0; i < N; ++i)
    {
        for (int j = 0; j < H; ++j)
        {
            res[i][j] = 0;
            for (int k = 0; k < N; ++k)
            {
                res[i][j] += first_matrix[i][k] * second_matrix[k][j];
            }
        }
    }
    return res;
}
// Метод для множення вектора на матрицю
int *multiplyVectorAndMatrix(int *vector, int **matrix)
{
    int *res = new int[H];
    for (int i = 0; i < H; i++)
    {
        int sum = 0;
        for (int j = 0; j < N; j++)
        {
            sum += matrix[j][i] * vector[j];
        }
        res[i] = sum;
    }
    return res;
}
// Метод для множення скаляру на вектор
int *multiplyScalarAndVector(int scalar, int *vector)
{
    int *res = new int[N];
    for (int i = 0; i < N; i++)
    {
        res[i] = scalar * vector[i];
    }
    return res;
}
// Метод для додавання векторів
int *addVectors(int *first_vector, int *second_vector)
{
    int *res = new int[H];
    for (int i = 0; i < H; i++)
    {
        res[i] = first_vector[i] + second_vector[i];
    }
    return res;
}
// Метод для об'єднання підвекторів в один вектор
void combineVector(const int *vector, int *result, int partOfVctr)
{
    int startPos = (partOfVctr - 1) * H;
    for (int i = 0; i < H; i++)
    {
        result[startPos + i] = vector[i];
    }
}
// Метод для обчислення кроку 3
void calculateStep3(int **MV, int **MM, int **MC, int *Z, int *B, int *X, int a, int e, int *A, int tId)
{
    int **MV_H = getSubMatrix(MV, tId);
    int **MC_H = getSubMatrix(MC, tId);
    int *Ah = addVectors(
        multiplyScalarAndVector(
            a,
            multiplyVectorAndMatrix(B, MV_H)),
        multiplyScalarAndVector(
            e,
            multiplyVectorAndMatrix(
                X,
                multiplyMatrix(MM, MC_H))));
    combineVector(Ah, A, tId);
    for (int i = 0; i < N; i++)
    {
        delete[] MV_H[i];
        delete[] MC_H[i];
    }
    delete[] MV_H;
    delete[] MC_H;
}
// Метод для очищення пам'яті
void clearMemory()
{
    for (int i = 0; i < N; i++)
    {
        delete[] MV[i];
        delete[] MC[i];
        delete[] MM[i];
    }
    delete[] MV;
    delete[] MC;
    delete[] MM;
    delete[] A;
    delete[] B;
    delete[] X;
    delete[] Z;
}