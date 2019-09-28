rraySort(arr):
        i = len(arr)
            while True:
                        i2 = 0
                                while True:
                                                if arr[i-1]>=arr[i2]:
                                                                    arr.insert(i2, arr[i-1])
                                                                                    del arr[i]
                                                                                                    i2 = 0
                                                                                                                    break
                                                                                                                            elif arr[i-1]<arr[i2]:
                                                                                                                                                i2 = i2 + 1
                                                                                                                                                                if i2==len(arr)-1:
                                                                                                                                                                                        break
                                                                                                                                                                                            i = i - 1
                                                                                                                                                                                                    print(arr)
                                                                                                                                                                                                            if i<0:
                                                                                                                                                                                                                            return arr



                                                                                                                                                                                                                        arr = [5, 2, 6, 2, 1, 7, 9, 0, 0, 6]
                                                                                                                                                                                                                        print(arr)
                                                                                                                                                                                                                        print('\n')
                                                                                                                                                                                                                        print(arraySort(arr))
                                                                                                                                                                                                                            
