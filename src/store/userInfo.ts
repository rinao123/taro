import { observable } from 'mobx';

const userinfoStore = observable({
  nickname: "",
  avatar: ""
});

export default userinfoStore
