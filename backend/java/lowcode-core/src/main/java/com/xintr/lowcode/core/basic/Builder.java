package com.xintr.lowcode.core.basic;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Supplier;

/**
 * <p>类说明</p>
 *
 * @author 张峰 zfvip_it@163.com
 * @createTime: 2024/9/27 13:35
 */
public class Builder<T> {

    private final Supplier<T> instantiator;
    private final List<Consumer<T>> modifiers = new ArrayList<>();

    public Builder(Supplier<T> instantiator) {
        this.instantiator = instantiator;
    }

    public static <T> Builder<T> of(Supplier<T> instantiator) {
        return new Builder<>(instantiator);
    }

    public <P1> Builder<T> with(Consumer1<T, P1> consumer, P1 p1) {
        Consumer<T> c = instance -> consumer.accept(instance, p1);
        modifiers.add(c);
        return this;
    }

    public <P1, P2> Builder<T> with(Consumer2<T, P1, P2> consumer, P1 p1, P2 p2) {
        Consumer<T> c = instance -> consumer.accept(instance, p1, p2);
        modifiers.add(c);
        return this;
    }

    public <P1, P2, P3> Builder<T> with(Consumer3<T, P1, P2, P3> consumer, P1 p1, P2 p2, P3 p3) {
        Consumer<T> c = instance -> consumer.accept(instance, p1, p2, p3);
        modifiers.add(c);
        return this;
    }

    public T build() {
        T value = instantiator.get();
        modifiers.forEach(modifier -> modifier.accept(value));
        modifiers.clear();
        return value;
    }

    /**
     * 1 参数 Consumer
     */
    @FunctionalInterface
    public interface Consumer1<T, P1> {
        void accept(T t, P1 p1);
    }

    /**
     * 2 参数 Consumer
     */
    @FunctionalInterface
    public interface Consumer2<T, P1, P2> {
        void accept(T t, P1 p1, P2 p2);
    }

    /**
     * 3 参数 Consumer
     */
    @FunctionalInterface
    public interface Consumer3<T, P1, P2, P3> {
        void accept(T t, P1 p1, P2 p2, P3 p3);
    }
}
